import React, { useState, useEffect } from "react";
import "../styles/Work.css";
import { dvInAll, sendSelect, autoChange, autoCheck } from "../api/API";
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
  const [isLoading, setIsLoading] = useState(false);
  const [toggleState, setToggleState] = useState(false);

  /* 송장번호,스캔일자 선택 */
  const handleSearchOptionChange2 = (e) => {
    setSearchOption2(e.target.value);
  };

  /* 스캔일자 선택 시 실행되는 날짜변형 */
  const handleStartDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD 00:00:00");
    setStartDate(formattedDate);
    console.log("시작날짜" + formattedDate);
    const endDate = dayjs(date).format("YYYY-MM-DD 23:59:59");
    setEndDate(endDate);
    console.log("종료날짜" + endDate);
  };

  /* 송장번호 입력 시 실행 */
  const handleSnNumChange = (e) => {
    setSnNumber(e.target.value);
  };

  /* 조회 버튼 클릭 시 실행 */
  const handleApiCall = () => {
    if (searchOption2 === "scandate") {
      handleScanDateApiCall();
    } else {
      handleInvoiceNumberApiCall();
    }
  };

  /* 날짜입력 */
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

  /* 송장번호입력 */
  const handleInvoiceNumberApiCall = async () => {
    try {
      const bran_cd = sessionStorage.getItem("saveId");
      const response = await dvInAll({
        barcode: snNumber,
        bran_cd: bran_cd,
        longTime: "",
      });
      console.log(response.data);

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

  /* 자료전송 버튼 클릭 시 실행 */
  const handleSendBtn = async () => {
    setIsLoading(true);

    try {
      const bran_cd = sessionStorage.getItem("saveId");
      const response = await sendSelect({
        bran_cd: bran_cd,
        start_time: startDate,
        end_time: endDate,
        longTime: "",
      });
      console.log(response.data);

      if (response.data.result === "00") {
        alert("전송완료");
      } else {
        alert("통신오류");
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  /* Auto 체크 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bran_cd = sessionStorage.getItem("saveId");
        const response = await autoCheck({
          bran_cd: bran_cd,
        });
        if (response.data.result === "00") {
          console.log(response.data.data[0]);

          const autoValue = response.data.data[0].auto;
          console.log("auto 값 :::", autoValue);

          if (autoValue === "1") {
            setToggleState(true);
          } else {
            setToggleState(false);
          }
          console.log("toggleState 값 :::", toggleState);
        } else {
          alert("조회 실패");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  /* 자동,수동 변환 */
  const handleToggle = async () => {
    const bran_cd = sessionStorage.getItem("saveId");
    console.log(toggleState);
    const newAutoValue = toggleState ? "0" : "1";
    console.log("toggleState" + toggleState);
    console.log("newAutoValue" + newAutoValue);

    try {
      const response = await autoChange(bran_cd, newAutoValue);
      console.log(response.data);
      setToggleState(!toggleState);
      console.log(newAutoValue);
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

          <button className="checkBtn" onClick={handleApiCall}>
            조회
          </button>

          <span id="total_count">
            {" "}
            조회량 :{apiResponse.length > 0 ? apiResponse.length : 0}건
          </span>
          {isLoading ? (
            <Loding />
          ) : (
            <div className="btnSet">
              <button className="sendBtn" onClick={handleSendBtn}>
                자료전송
              </button>
            </div>
          )}
          <input
            type="checkbox"
            id="toggle"
            checked={toggleState}
            onChange={handleToggle}
            hidden
          />

          <label htmlFor="toggle" className="toggleSwitch">
            <span className="toggleButton"></span>
          </label>
          <div className="toggleLabel">{toggleState ? "자동" : "수동"}</div>
        </div>

        <div className="cardTable">
          <ul id="ulTable">
            <li>
              <ul>
                <li>No.</li>
                <li>업무</li>
                <li>영업소</li>
                <li>상대영업소</li>
                <li>차량</li>
                <li>송장</li>
                <li>상대</li>
                <li>날짜</li>
                <li>시간</li>
                <li>사원</li>
              </ul>
            </li>
            {apiResponse &&
              apiResponse.map((apiResponse, index) => (
                <li key={apiResponse.index}>
                  <ul>
                    <li>{index + 1}</li>
                    <li>{apiResponse.tm_dv}</li>
                    <li>{apiResponse.bran_cd}</li>
                    <li>{apiResponse.tg_bran_cd}</li>
                    <li>{apiResponse.car_num}</li>
                    <li>{apiResponse.barcode}</li>
                    <li>{apiResponse.pob}</li>
                    <li>{apiResponse.scandate}</li>
                    <li>{apiResponse.scantime}</li>
                    <li>{apiResponse.emp_cd}</li>
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
