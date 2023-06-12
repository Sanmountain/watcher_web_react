import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { getRecordVideoList } from "../api/API_camera";
import "../styles/VassCam.css";

const videosPerPage = 4;

export default function VassCam() {
  const [apiResponse, setApiResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [videoPlaying, setVideoPlaying] = useState(true);

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
          setApiResponse(response.data.cam_list);
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

  const displayVideos = () => {
    const startIndex = (currentPage - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;

    return apiResponse.slice(startIndex, endIndex).map((video, index) => (
      <div className="video-wrapper" key={index}>
        {apiResponse.cam_name}
        <ReactPlayer
          url={video.stream_url}
          className="react-player"
          width="90%"
          height="auto"
          controls={true}
          playing={videoPlaying}
        />
      </div>
    ));
  };

  const totalPages = Math.ceil(apiResponse.length / videosPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePauseVideos = () => {
    setVideoPlaying((prevState) => !prevState);
  };

  return (
    <>
      <div className="containerVideo">
        <div className="video-menu">
          <button className="videoMenuBtn">송장번호 조회</button>
          <input></input>
          <button className="videoMenuBtn">이전 송장 조회</button>
          <input></input>
        </div>
        <div className="content-wrapper">
          <div className="video-grid">{apiResponse && displayVideos()}</div>
          <div className="pagination">
            <button>-10초</button>
            <button onClick={handlePauseVideos}>일시정지</button>
            <button>+10초</button>
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
        </div>
      </div>
    </>
  );
}
