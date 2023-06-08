import { useState, useEffect } from "react";
import { getRecordVideoList } from "../api/API_camera";

export default function VassCam() {
  /* 녹화 영상 정보 목록 조회 */
  useEffect(() => {
    const videoView = async () => {
      try {
        const startDate = localStorage.getItem("startDate");
        console.log("startDate" + startDate);
        const endDate = localStorage.getItem("endDate");
        console.log("endDate" + endDate);
        const saId = localStorage.getItem("saveSaId");
        console.log("saId" + saId);
        const accountId = localStorage.getItem("saveAcId");
        console.log("accountId" + accountId);

        const response = await getRecordVideoList({
          sa_id: saId,
          account_id: accountId,
          start_time: startDate,
          end_time: endDate,
        });
        if (response.data.result === "00") {
          console.log(response.data);
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
        <div className="card-header">
          <select>
            <option value="receive">배송입고</option>
            <option value="delivery">집하출고</option>
          </select>
          <select>
            <option value="scandate">스캔일자</option>
            <option value="serialnum">송장번호</option>
          </select>
        </div>

        <div className="cardTable">
          <ul id="ulTable">
            <li>
              <ul>
                <li>No.</li>
                <li>업무</li>
                <li>날짜&시간</li>
                <li>차량번호</li>
                <li>송장번호</li>
                <li>화물추적</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
