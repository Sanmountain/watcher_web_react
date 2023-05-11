import React, { useState } from "react";
import "../styles/Work.css";
import { dvInAll } from "../api/API";
import { getKtToken } from "../api/API_account";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import Loding from "../components/work/Loading";

export default function Work() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [snNumber, setSnNumber] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [searchOption2, setSearchOption2] = useState("scandate");
  const [ktToken, setktToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /* 송장번호,스캔일자 선택 */
  const handleSearchOptionChange2 = (e) => {
    setSearchOption2(e.target.value);
  };

  /* 스캔일자 선택 시 실행되는 날짜변형함수 */
  const handleStartDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD 00:00:00");
    setStartDate(formattedDate);
    console.log("aaa" + formattedDate);
    const endDate = dayjs(date).format("YYYY-MM-DD 23:59:59");
    setEndDate(endDate);
    console.log("aaabb" + endDate);
  };

  /* 송장번호 입력 시 실행함수 */
  const handleSnNumChange = (e) => {
    setSnNumber(e.target.value);
  };

  const handleApiCall = () => {
    if (searchOption2 === "scandate") {
      handleScanDateApiCall();
    } else {
      handleInvoiceNumberApiCall();
    }
  };

  const handleScanDateApiCall = async () => {
    setIsLoading(true);
    try {
      const bran_cd = sessionStorage.getItem("saveId");
      const response = await dvInAll({
        start_time: startDate,
        end_time: endDate,
        bran_cd: bran_cd,
        longTime: "",
      });
      setIsLoading(false);
      console.log(response.data);
      setApiResponse(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInvoiceNumberApiCall = async () => {
    setIsLoading(true);
    try {
      const bran_cd = sessionStorage.getItem("saveId");
      const response = await dvInAll({
        barcode: snNumber,
        bran_cd: bran_cd,
        longTime: "",
      });
      console.log(response.data);
      setIsLoading(false);

      if (response.data.result === "10") {
        alert("송장번호를 입력해주세요.");
      } else {
        setApiResponse(response.data.data);
        alert("조회 성공");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const useKTAuthToken = async () => {
    try {
      const response = await getKtToken({
        saId: "",
      });
      if (response.data.result === "00") {
        setktToken(response.data.saId);
        console.log("## getKTAuthenToken =>", response.data);
      } else {
        alert("Token 저장 실패");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="card-header">
          <select>
            <option value="receive">배송입고</option>
            <option value="delivery">집하출고</option>
          </select>
          <select onChange={handleSearchOptionChange2}>
            <option value="scandate">스캔일자</option>
            <option value="serialnum">송장번호</option>
          </select>

          {searchOption2 === "scandate" ? (
            <div className="datepicker">
              <DatePicker
                dateFormat="yyyy-MM-dd"
                selected={dayjs(startDate).toDate()}
                onChange={handleStartDateChange}
              />
            </div>
          ) : (
            <div className="datepicker">
              <input
                type="text"
                placeholder="송장번호 입력"
                onChange={handleSnNumChange}
              />
            </div>
          )}
          {isLoading ? (
            <Loding />
          ) : (
            <button className="checkBtn" onClick={handleApiCall}>
              조회
            </button>
          )}
          <span id="total_count">
            {" "}
            조회량 :{apiResponse.length > 0 ? apiResponse.length : 0}건
          </span>
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
            {apiResponse &&
              apiResponse.map((apiResponse, index) => (
                <li key={apiResponse.id}>
                  <ul>
                    <li>{index + 1}</li>
                    <li>업무</li>
                    <li>{apiResponse.scan_total_time}</li>
                    <li>{apiResponse.car_num}</li>
                    <li>{apiResponse.barcode}</li>
                    <li>
                      <button onClick={useKTAuthToken}>조회</button>
                    </li>
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
