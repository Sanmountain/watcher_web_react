import React, { useState } from "react";
import "../styles/Work.css";
import { dvInAll } from "../api/API";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Work() {
  const [startDate, setStartDate] = useState(new Date());
  const [apiResponse, setApiResponse] = useState(null);

  const handleApiCall = async () => {
    try {
      const response = await dvInAll({
        start_time: "2023-04-14 00:00:00",
        end_time: "2023-04-14 23:59:59",
        bran_cd: "551",
        longTime: ""
      });
      setApiResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="container-fluid">
        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <div className="card-header">
            <div className="row">
              {/* 업무분류 */}
              <div className="dropdown" style={{ width: "110px" }}>
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  배송입고
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#!">
                      배송입고
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      집하출고
                    </a>
                  </li>
                </ul>
              </div>

              {/* 검색조건 */}
              <div className="dropdown ml-1 mr-1" style={{ width: "110px" }}>
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  스캔일자
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#!">
                      스캔일자
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      송장번호
                    </a>
                  </li>
                </ul>
              </div>

              {/* 데이트 픽커 */}
              <div style={{ width: "150px" }}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>

              {/* 조회 */}
              <div className="ml-1 mr-1" style={{ width: "110px" }}>
                <button className="btn btn-dark btn_search" onClick={handleApiCall}>조회</button>
              </div>

              <div
                className="text text-dark align-self-center ml-1 mr-1"
                style={{ width: "130px" }}
              >
                <span id="total_count"> 조회량 : 6368건</span>
              </div>

              {apiResponse && (
        <div>
          <p>API response:</p>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
