import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { getRecordVideoList } from "../api/API_camera";
import { caminfo, camModify } from "../api/API";
import "../styles/VassCam.css";
import { Dropdown, DropdownButton, Modal, Button } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const videosPerPage = 4;

export default function VassCam() {
  const [changeApiResponse, setChgApiResponse] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [apiResponse, setApiResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [camBarcode, setCamBarcode] = useState("");
  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const playerRefs = useRef([]);
  const [showModal, setShowModal] = useState(false);

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
          alert("조회 실패");
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
        const barcode = localStorage.getItem("barcode");
        setCamBarcode(barcode);

        const response = await getRecordVideoList({
          sa_id: saId,
          account_id: accountId,
          start_time: startDate,
          end_time: endDate,
        });
        if (response.data.result === "00") {
          console.log(response.data);
          setVideoList(response.data.cam_list);
        } else {
          alert("조회 실패");
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    videoView();
  }, []);

  const totalPages = Math.ceil(apiResponse.length / videosPerPage);

  /* 페이지 이동(후) */
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  /* 페이지 이동(전) */
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  /* 영상 일시정지 */
  const handlePauseVideos = () => {
    setVideoPlaying((prevState) => !prevState);
  };

  /* 영상 10초 후 */
  const handleRewindVideos = () => {
    playerRefs.current.forEach((player) => {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime - 10);
    });
  };

  /* 영상 10초 후 */
  const handleForwardVideos = () => {
    playerRefs.current.forEach((player) => {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime + 10);
    });
  };

  /* 재생 순서 변경 (모달창 띄움)*/
  const handleOption2 = () => {
    setShowModal(true);
  };

  /* 모달창 닫기 */
  const handleCloseModal = () => {
    setShowModal(false);
  };

  /* 드래그 */
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(changeApiResponse);

    // Get the reordered item and the item at the destination index
    const reorderedItem = items[result.source.index];
    const destinationItem = items[result.destination.index];

    // Swap the cam_seq values
    const tempSeq = reorderedItem.cam_seq;
    reorderedItem.cam_seq = destinationItem.cam_seq;
    destinationItem.cam_seq = tempSeq;

    // Remove the reordered item from its original position
    items.splice(result.source.index, 1);

    // Insert the reordered item into its new position
    items.splice(result.destination.index, 0, reorderedItem);

    setChgApiResponse(items);

    const ids = changeApiResponse.map((item) => item.id);
    const seqs = changeApiResponse.map((item) => item.cam_seq);
    const names = changeApiResponse.map((item) => item.cam_name);
    localStorage.setItem("tempIds", JSON.stringify(ids));
    localStorage.setItem("tempSeqs", JSON.stringify(seqs));
    localStorage.setItem("tempNames", JSON.stringify(names));
  };

  /* 드래그 후 저장 */
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
      // console.log("ccc id:" + ccc[0].id);
      // console.log("ccc cam_seq:" + ccc[0].cam_seq);
      // console.log("ccc cam_name:" + ccc[0].cam_name);
      // console.log("ccc id:" + ccc[1].id);
      // console.log("ccc cam_seq:" + ccc[1].cam_seq);
      // console.log("ccc cam_name:" + ccc[1].cam_name);
      const response = await camModify(ccc);

      if (response.data.result === "00") {
        console.log(response.data);
        setApiResponse(changeApiResponse);
      } else {
        alert("조회 실패");
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="containerVideo">
        <div className="video-menu">
          <button className="videoMenuBtn">송장번호 조회</button>
          <input value={camBarcode} readOnly></input>
          <button className="videoMenuBtn">이전 송장 조회</button>
          <input></input>
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
            <DropdownButton title="설정" variant="secondary">
              <Dropdown.Item>재생 간격 변경</Dropdown.Item>
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
                              <div className="tableTd">{item.cam_name}</div>
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
