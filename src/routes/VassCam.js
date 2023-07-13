import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { getRecordVideoList } from "../api/API_camera";
import { caminfo, camModify } from "../api/API";
import "../styles/VassCam.css";
import { Dropdown, DropdownButton, Modal, Button } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { dvInAll } from "../api/API";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const videosPerPage = 4;

export default function VassCam() {
  const [changeApiResponse, setChgApiResponse] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [apiResponse, setApiResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const playerRefs = useRef([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [camBarcode, setCamBarcode] = useState("");
  const [barApiResponse, setBarApiResponse] = useState([]);

  /* 영상 순서 */
  useEffect(() => {
    const handleCaminfo = async () => {
      try {
        const user_id = localStorage.getItem("saveId");
        const response = await caminfo({
          user_id: user_id,
        });

        if (response.data.result === "00") {
          console.log(response.data);

          const sortedApiResponse = response.data.data.sort(
            (a, b) => parseInt(a.cam_seq) - parseInt(b.cam_seq)
          );

          setApiResponse(sortedApiResponse);
          setChgApiResponse(response.data.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "조회 실패",
            confirmButtonText: "확인",
          });
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleCaminfo();
  }, []);

  /* 녹화 영상 정보 목록 조회 */
  useEffect(() => {
    const videoView = async () => {
      try {
        const startDate = localStorage.getItem("formattedStartDate");
        const endDate = localStorage.getItem("formattedEndDate");
        const saId = localStorage.getItem("saveSaId");
        const accountId = localStorage.getItem("saveAcId");

        const response = await getRecordVideoList({
          sa_id: saId,
          account_id: accountId,
          start_time: startDate,
          end_time: endDate,
        });
        if (response.data.result === "00") {
          console.log(response.data);
          setVideoList(response.data.cam_list);
        } else if (response.data.result === "11") {
          Swal.fire({
            icon: "warning",
            title: "해당 지점은 영상 조회가 불가능합니다.",
            confirmButtonText: "확인",
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "조회 실패",
            confirmButtonText: "확인",
          });
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    videoView();
  }, [refreshKey]);

  const totalPages = Math.ceil(apiResponse.length / videosPerPage);

  /* 페이지 관련 */

  // 페이지 이동(후)
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  // 페이지 이동(전)
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  /* 재생 관련 */

  // 영상 일시정지
  const handlePauseVideos = () => {
    setVideoPlaying((prevState) => !prevState);
  };

  // 영상 10초 후
  const handleRewindVideos = () => {
    playerRefs.current.forEach((player) => {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime - 10);
    });
  };

  // 영상 10초 후
  const handleForwardVideos = () => {
    playerRefs.current.forEach((player) => {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime + 10);
    });
  };

  /* 카메라 설정 관련 */

  // 설정 버튼 (모달창 띄움)
  const handleOption2 = () => {
    setShowModal(true);
  };

  // 모달창 닫기
  const handleCloseModal = () => {
    setShowModal(false);
  };

  /* 카메라 이름 변경 */
  // 더블 클릭 이벤트를 처리하고 해당 카메라의 편집 가능 상태를 변경
  const handleDoubleClick = (cam_id) => {
    setEditing((prevEditing) => ({ ...prevEditing, [cam_id]: true }));
  };

  // 입력 이벤트를 처리하고 카메라 이름을 변경
  const handleChange = (cam_id, event) => {
    setChgApiResponse((prevChgApiResponse) =>
      prevChgApiResponse.map((item) =>
        item.cam_id === cam_id
          ? { ...item, cam_name: event.target.value }
          : item
      )
    );
  };

  // 입력 필드에서 포커스를 잃을 때 편집 가능한 상태를 다시 false로 변경
  const handleBlur = (cam_id) => {
    setEditing((prevEditing) => ({ ...prevEditing, [cam_id]: false }));

    // 로컬 스토리지 업데이트
    const ids = changeApiResponse.map((item) => item.id);
    const seqs = changeApiResponse.map((item) => item.cam_seq);
    const names = changeApiResponse.map((item) => item.cam_name);
    localStorage.setItem("tempIds", JSON.stringify(ids));
    localStorage.setItem("tempSeqs", JSON.stringify(seqs));
    localStorage.setItem("tempNames", JSON.stringify(names));
  };

  /* 카메라 드래그 순서 변경 */
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(changeApiResponse);

    // 재배열된 항목 가져오기
    const reorderedItem = items[result.source.index];

    // 정렬된 항목을 원래 위치에서 제거
    items.splice(result.source.index, 1);

    // 정렬된 항목을 새 위치에 삽입
    items.splice(result.destination.index, 0, reorderedItem);

    // 각 항목의 cam_seq를 해당 항목의 인덱스 + 1로 설정
    items.map((item, index) => (item.cam_seq = index + 1));

    setChgApiResponse(items);

    const ids = changeApiResponse.map((item) => item.id);
    const seqs = changeApiResponse.map((item) => item.cam_seq);
    const names = changeApiResponse.map((item) => item.cam_name);
    localStorage.setItem("tempIds", JSON.stringify(ids));
    localStorage.setItem("tempSeqs", JSON.stringify(seqs));
    localStorage.setItem("tempNames", JSON.stringify(names));
  };

  // 드래그 후 저장
  const handleVideoSeq = async () => {
    const ids = JSON.parse(localStorage.getItem("tempIds"));
    const seqs = JSON.parse(localStorage.getItem("tempSeqs"));
    const names = JSON.parse(localStorage.getItem("tempNames"));

    try {
      const ccc = ids.map((id, index) => ({
        id: id,
        cam_seq: seqs[index],
        cam_name: names[index],
      }));
      const response = await camModify(ccc);

      if (response.data.result === "00") {
        console.log(response.data);
        setApiResponse(changeApiResponse);
        Swal.fire({
          icon: "success",
          title: "저장 완료",
          confirmButtonText: "확인",
        });
        setShowModal(false);
      } else {
        Swal.fire({
          icon: "warning",
          title: "저장 실패",
          confirmButtonText: "확인",
        });
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* 송장번호 조회 */

  const handleSnNumChange = (e) => {
    setCamBarcode(e.target.value);
  };

  useEffect(() => {
    const barcodeView = async () => {
      try {
        const bran_cd = localStorage.getItem("saveId");
        const snNumValue = camBarcode;

        console.log("bran_cd??" + bran_cd);
        console.log("snNumValue??" + snNumValue);

        const response = await dvInAll({
          barcode: snNumValue,
          bran_cd: bran_cd,
          longTime: "",
        });
        console.log(response.data);
        setBarApiResponse(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    barcodeView();
  }, [camBarcode]);

  const handleInvoiceNumberApiCall = () => {
    const firstItemScanTotalTime = barApiResponse[0].scan_total_time;
    console.log("firstItemScanTotalTime ::" + firstItemScanTotalTime);

    const formattedStartDate = dayjs(firstItemScanTotalTime)
      .subtract(10, "seconds")
      .format("YYYYMMDDHHmmss");

    console.log("formattedStartDate ::" + formattedStartDate);

    const formattedEndDate = dayjs(firstItemScanTotalTime)
      .add(30, "minutes")
      .format("YYYYMMDDHHmmss");

    console.log("barformattedEndDate ::" + formattedEndDate);

    localStorage.setItem("formattedStartDate", formattedStartDate);
    localStorage.setItem("formattedEndDate", formattedEndDate);

    setRefreshKey(refreshKey + 1);
  };

  return (
    <>
      <div className="containerVideo">
        <div className="video-menu">
          <button className="videoMenuBtn" onClick={handleInvoiceNumberApiCall}>
            송장번호 조회
          </button>
          <input
            className="videoMenuInput"
            placeholder="송장번호를 입력해주세요"
            onChange={handleSnNumChange}
          ></input>
        </div>
        <div className="content-wrapper">
          <div className="video-grid">
            {apiResponse &&
              apiResponse
                .slice(startIndex, endIndex)
                .map((apiResponse, cam_id) => {
                  const videosWithSameCamId = videoList.filter(
                    (video) => video.cam_id === apiResponse.cam_id
                  );

                  return (
                    <div className="video-wrapper" key={apiResponse.cam_id}>
                      <div className="videoCamname">{apiResponse.cam_name}</div>
                      {videosWithSameCamId.map((video) => (
                        <ReactPlayer
                          key={video.id}
                          ref={(ref) => (playerRefs.current[cam_id] = ref)}
                          url={video.stream_url}
                          className="react-player"
                          width="90%"
                          height="auto"
                          controls={true}
                          playing={videoPlaying}
                        />
                      ))}
                    </div>
                  );
                })}
          </div>
          <div className="pagination">
            <button className="btn1" onClick={handleRewindVideos}>
              -10초
            </button>
            <button className="btn1" onClick={handlePauseVideos}>
              {videoPlaying ? "일시정지" : "재생"}
            </button>
            <button className="btn1" onClick={handleForwardVideos}>
              +10초
            </button>
            <DropdownButton
              title="설정"
              variant="secondary"
              className="camDropBtn"
            >
              <Dropdown.Item onClick={handleOption2}>
                재생 순서 변경
              </Dropdown.Item>
            </DropdownButton>
            <button onClick={goToPreviousPage}>{"<"}</button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={goToNextPage}>{">"}</button>
          </div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>카메라 설정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="items">
                  {(provided) => (
                    <div
                      className="custom-table"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <div className="tableHead">
                        <div className="tableTh">No.</div>
                        <div className="tableTh">카메라 위치</div>
                      </div>
                      {changeApiResponse.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="tableContent"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="tableTd">{item.cam_seq}</div>
                              <div className="tableTd">
                                {editing[item.cam_id] ? (
                                  <input
                                    value={item.cam_name}
                                    onChange={(event) =>
                                      handleChange(item.cam_id, event)
                                    }
                                    onBlur={() => handleBlur(item.cam_id)}
                                    autoFocus
                                  />
                                ) : (
                                  <span
                                    onDoubleClick={() =>
                                      handleDoubleClick(item.cam_id)
                                    }
                                  >
                                    {item.cam_name}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleVideoSeq}>
                저장
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}>
                닫기
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}
