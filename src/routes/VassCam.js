import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { getRecordVideoList } from "../api/API_camera";

export default function VassCam() {
  const [apiResponse, setApiResponse] = useState([]);

  /* 녹화 영상 정보 목록 조회 */
  useEffect(() => {
    const videoView = async () => {
      try {
        const startDate = localStorage.getItem("startDate");
        const endDate = localStorage.getItem("endDate");
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

  return (
    <>
      <div className="container">
        {apiResponse &&
          apiResponse.map((apiResponse, cam_id) => (
            <div className="video-wrapper" key={cam_id}>
              <ReactPlayer
                url={apiResponse.stream_url}
                className="react-player"
                width="120%"
                height="auto"
                controls={true}
                playing={true}
              />
            </div>
          ))}
      </div>
    </>
  );
}
