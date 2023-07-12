import React, { useState, useEffect } from "react";
import "../styles/Work.css";
import { dvInAll } from "../api/API";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Loding from "../components/work/Loading";
import Swal from "sweetalert2";

export default function VASS() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [snNumber, setSnNumber] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [searchOption1, setSearchOption1] = useState("receive");
  const [searchOption2, setSearchOption2] = useState("scandate");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  /* 배송입고, 집하출고 선택 */
  const handleSearchOptionChange1 = (e) => {
    setSearchOption1(e.target.value);
  };

  /* 송장번호,스캔일자 선택 */
  const handleSearchOptionChange2 = (e) => {
    setSearchOption2(e.target.value);
  };

  /* 스캔일자 선택 시 실행되는 날짜변형함수 */
  const handleStartDateChange = (date) => {
    const startDate = dayjs(date).format("YYYY-MM-DD 00:00:00");
    setStartDate(startDate);
    console.log("handleStartDateChange start date :" + startDate);
    const endDate = dayjs(date).format("YYYY-MM-DD 23:59:59");
    setEndDate(endDate);
    console.log("handleStartDateChange end data :" + endDate);
  };

  /* 송장번호 입력 시 실행함수 */
  const handleSnNumChange = (e) => {
    setSnNumber(e.target.value);
  };

  const handleApiCall = () => {
    if (searchOption2 === "scandate" && searchOption1 === "receive") {
      handleScanDateApiCall();
    } else if (searchOption2 === "serialnum" && searchOption1 === "receive") {
      handleInvoiceNumberApiCall();
    } else if (searchOption2 === "scandate" && searchOption1 === "delivery") {
      handleDeliveryDateApiCall();
    } else {
      handleDeliveryNbApiCall();
    }
  };

  /* 배송입고, 스캔일자 선택 시 */
  const handleScanDateApiCall = async () => {
    setIsLoading(true);
    try {
      const bran_cd = localStorage.getItem("saveId");
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

  /* 배송입고, 송장번호 선택 시 */
  const handleInvoiceNumberApiCall = async () => {
    try {
      const bran_cd = localStorage.getItem("saveId");
      const response = await dvInAll({
        barcode: snNumber,
        bran_cd: bran_cd,
        longTime: "",
      });
      console.log(response.data);

      if (response.data.result === "10") {
        Swal.fire({
          icon: "warning",
          title: "송장번호를 입력해주세요.",
          confirmButtonText: "확인",
        });
      } else {
        setApiResponse(response.data.data);
        Swal.fire({
          icon: "success",
          title: "조회 성공",
          confirmButtonText: "확인",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* 집하출고, 스캔일자 선택 시 */
  const handleDeliveryDateApiCall = async () => {
    setIsLoading(true);
    try {
      const bran_cd = localStorage.getItem("saveId");
      const response = await dvInAll({
        start_time: startDate,
        end_time: endDate,
        bran_cd: bran_cd,
        longTime: "",
      });
      setIsLoading(false);
      console.log(response.data);

      const filteredData = response.data.data.filter(
        (item) => item.tm_dv !== "60"
      );
      setApiResponse(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  /* 집하출고, 송장번호 선택 시 */
  const handleDeliveryNbApiCall = async () => {
    try {
      const bran_cd = localStorage.getItem("saveId");
      const response = await dvInAll({
        barcode: snNumber,
        bran_cd: bran_cd,
        longTime: "",
      });
      console.log(response.data);

      if (response.data.result === "10") {
        Swal.fire({
          icon: "warning",
          title: "송장번호를 입력해주세요.",
          confirmButtonText: "확인",
        });
      } else {
        const filteredData = response.data.data.filter(
          (item) => item.tm_dv !== "60"
        );
        setApiResponse(filteredData);
        Swal.fire({
          icon: "success",
          title: "조회 성공",
          confirmButtonText: "확인",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* 날짜 선택 기본값 세팅 */
  useEffect(() => {
    const fetchData = async () => {
      const defaultStartDate = dayjs().startOf("day").toDate();
      const defaultEndDate = dayjs().endOf("day").toDate();

      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);
    };

    fetchData();
  }, []);

  /* 캠 조회 화면으로 이동 */
  const handleClick = (id, scan_total_time, barcode) => {
    const formattedStartDate = dayjs(scan_total_time).format("YYYYMMDDHHmmss");
    console.log("formattedStartDate ::" + formattedStartDate);
    const formattedEndDate = dayjs(scan_total_time)
      .add(30, "minutes")
      .format("YYYYMMDDHHmmss");
    console.log("formattedEndDate ::" + formattedEndDate);
    localStorage.setItem("formattedStartDate", formattedStartDate);
    localStorage.setItem("formattedEndDate", formattedEndDate);
    localStorage.setItem("barcode", barcode);
    setRefreshKey(refreshKey + 1);
    navigate("/vasscam");
  };

  return (
    <>
      <div className="container">
        <div className="card-header">
          <select onChange={handleSearchOptionChange1}>
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
          <div id="ulTable3">
            <div>
              <li>No.</li>
              <li>업무</li>
              <li>날짜&시간</li>
              <li>차량번호</li>
              <li>송장번호</li>
              <li>화물추적</li>
            </div>
            {apiResponse &&
              apiResponse.map((video, index) => (
                <div key={video.id}>
                  <li>{apiResponse.length - index}</li>
                  <li>{video.tm_dv}</li>
                  <li>{video.scan_total_time}</li>
                  <li>{video.car_num}</li>
                  <li>{video.barcode}</li>
                  <li>
                    <button
                      className="vassBtn"
                      onClick={() =>
                        handleClick(
                          video.id,
                          video.scan_total_time,
                          video.barcode
                        )
                      }
                    >
                      조회
                    </button>
                  </li>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
