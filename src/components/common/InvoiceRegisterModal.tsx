import * as S from "../../styles/InvoiceRegisterModal.styles";
import { IInvoiceRegisterModalProps } from "../../types/InvoiceRegisterModal.types";
import CommonButton from "./CommonButton";
import { ChangeEvent, useEffect, useState } from "react";

import { registerInvoice } from "../../api/work/registerInvoice";
import {
  IRegisterModalStatusData,
  IRegisteredData,
} from "../../types/registerInvoice.types";
import { getRegisterModalStatus } from "../../api/work/getRegisterModalStatus";
import { useRecoilValue } from "recoil";
import { workFilterState } from "../../stores/work/workFilterState";
import { loginState } from "../../stores/loginState";
import Loading from "./Loading";
export default function InvoiceRegisterModal({
  setIsDisplayRegisterModal,
}: IInvoiceRegisterModalProps) {
  const [registerInfo, setRegisterInfo] = useState<IRegisterModalStatusData>({
    bran_cd: "",
    car_num: "",
    emp_cd: "",
    last_scan_time: "",
    pob: "",
    scandate: "",
    tg_bran_cd: "",
    tm_dv: "",
  });
  const [registeredData, setRegisteredData] = useState<IRegisteredData>({
    tm_dv: "",
    scandate: "",
    bran_cd: "",
    car_num: "",
    emp_cd: "",
    tg_bran_cd: "",
    pob: "",
    barcode: "",
  });
  const filterOption = useRecoilValue(workFilterState);
  const login = useRecoilValue(loginState);

  const { mutate: registerModalStatus } = getRegisterModalStatus(
    setRegisterInfo,
    setRegisteredData,
  );
  const { mutate: registerInvoiceMutate, isLoading: isRegisterLoading } =
    registerInvoice(setIsDisplayRegisterModal);

  useEffect(() => {
    registerModalStatus();
  }, [filterOption]);

  const onClickCloseButton = () => {
    setIsDisplayRegisterModal(false);
  };

  // NOTE 사원, 영업소, 상대, 차량번호 onChange
  const handleRegisteredData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, tagName } = e.target;

    if (name === "car_num" && tagName === "SELECT") {
      // NOTE 차량번호는 selectBox와 input 두 개로 컨트롤 가능
      setRegisteredData((prevState) => ({
        ...prevState,
        car_num: value,
      }));
      return;
    }

    setRegisteredData({ ...registeredData, [name]: value });
  };

  // NOTE 06시부터 1초씩 증가
  const addSecondsToTime = (time: string, secondsToAdd: number) => {
    const [hour, minute, second] = time.split(":").map(Number);
    const totalSeconds = hour * 3600 + minute * 60 + second + secondsToAdd;

    const newHour = Math.floor(totalSeconds / 3600);
    const newMinute = Math.floor((totalSeconds % 3600) / 60);
    const newSecond = totalSeconds % 60;

    return `${newHour.toString().padStart(2, "0")}:${newMinute
      .toString()
      .padStart(2, "0")}:${newSecond.toString().padStart(2, "0")}`;
  };

  // NOTE 송장등록
  const onClickRegisterButton = () => {
    const barcodes = registeredData.barcode.split("\n");

    const barcodesWithoutBlank = barcodes.filter(
      (barcode) => barcode.trim() !== "",
    );

    const newRegisteredData = barcodesWithoutBlank.map((barcode) => {
      const withoutBlank = barcode.replace(/-/g, "");

      return {
        ...registeredData,
        barcode: withoutBlank,
      };
    });

    const tm_dv = newRegisteredData.map((item) => item.tm_dv);
    const bran_cd = newRegisteredData.map((item) => item.bran_cd);
    const pob = newRegisteredData.map((item) => item.pob);
    const car_num = newRegisteredData.map((item) => item.car_num);
    const barcode = newRegisteredData.map((item) => item.barcode);
    const tg_bran_cd = newRegisteredData.map((item) => item.tg_bran_cd);
    const scandate = newRegisteredData.map((item) => item.scandate);
    const emp_cd = newRegisteredData.map((item) => item.emp_cd);

    let currentTime = "06:00:00";
    const finalRegisteredData = [];

    for (let i = 0; i < barcode.length; i++) {
      const scan_total_time = `${scandate[i]} ${currentTime}`;

      const pushData = {
        tm_dv: tm_dv[i],
        bran_cd: bran_cd[i],
        pob: pob[i],
        car_num: car_num[i],
        barcode: barcode[i],
        tg_bran_cd: tg_bran_cd[i],
        scandate: scandate[i],
        scantime: currentTime,
        emp_cd: emp_cd[i],
        scan_total_time,
        dev_ver: "",
        dev_serial: "watcher",
      };

      finalRegisteredData.push(pushData);
      currentTime = addSecondsToTime(currentTime, 1);
    }

    registerInvoiceMutate(finalRegisteredData);
  };

  return (
    <S.Container>
      {isRegisterLoading && (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      )}

      <S.TopContainer>
        송장 등록
        <S.CloseIcon onClick={onClickCloseButton} />
      </S.TopContainer>

      <S.InfoContainer>
        <S.InfoSelectContainer>
          <S.LeftRightContainer>
            <S.TitleInputContainer>
              <S.Title>업무분류</S.Title>
              <S.Info>
                {login.company === "LOGEN" &&
                  (filterOption?.receivingShipment === "receive" ? "60" : "30")}
                {login.company === "LOTTE" &&
                  (filterOption?.receivingShipment === "receive" ? "21" : "20")}
              </S.Info>
            </S.TitleInputContainer>
            <S.TitleInputContainer>
              <S.Title>날짜</S.Title>
              <S.Info>{filterOption?.date}</S.Info>
            </S.TitleInputContainer>
            <S.TitleInputContainer>
              <S.Title>사업장</S.Title>
              <S.Info>{login?.branchCode}</S.Info>
            </S.TitleInputContainer>
          </S.LeftRightContainer>
          <S.LeftRightContainer>
            <S.TitleInputContainer>
              <S.Title>사원</S.Title>
              {registerInfo?.emp_cd ? (
                <S.InfoSelectBox
                  name="emp_cd"
                  value={registeredData.emp_cd}
                  onChange={handleRegisteredData}
                >
                  {registerInfo.emp_cd.split(",").map((el, index) => (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  ))}
                </S.InfoSelectBox>
              ) : (
                <S.InfoInput
                  name="emp_cd"
                  onChange={handleRegisteredData}
                  value={registeredData.emp_cd}
                />
              )}
            </S.TitleInputContainer>
            <S.TitleInputContainer>
              <S.Title>영업소</S.Title>
              {registerInfo?.tg_bran_cd ? (
                <S.InfoSelectBox
                  name="tg_bran_cd"
                  value={registeredData.tg_bran_cd}
                  onChange={handleRegisteredData}
                >
                  {registerInfo.tg_bran_cd.split(",").map((el, index) => (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  ))}
                </S.InfoSelectBox>
              ) : (
                <S.InfoInput
                  name="tg_bran_cd"
                  value={registeredData.tg_bran_cd}
                  onChange={handleRegisteredData}
                />
              )}
            </S.TitleInputContainer>
            <S.TitleInputContainer>
              <S.Title>상대</S.Title>
              {registerInfo?.pob ? (
                <S.InfoSelectBox
                  name="pob"
                  value={registeredData.pob}
                  onChange={handleRegisteredData}
                >
                  {registerInfo.pob.split(",").map((el, index) => (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  ))}
                </S.InfoSelectBox>
              ) : (
                <S.InfoInput
                  name="pob"
                  value={registeredData.pob}
                  onChange={handleRegisteredData}
                />
              )}
            </S.TitleInputContainer>
          </S.LeftRightContainer>
        </S.InfoSelectContainer>
        <S.CarContainer>
          <S.CarTitle>차량번호</S.CarTitle>
          <S.CarSelectBax
            name="car_num"
            value={registeredData.car_num}
            onChange={handleRegisteredData}
          >
            {registerInfo?.car_num.split(",").map((el, index) => (
              <option key={index} value={el}>
                {el}
              </option>
            ))}
          </S.CarSelectBax>
          <S.CarInfoInput
            name="car_num"
            value={registeredData.car_num}
            onChange={handleRegisteredData}
          />
        </S.CarContainer>
      </S.InfoContainer>

      <S.TextAreaInfoContainer>
        <S.TextAreaInfo>
          ※스캔 시간은 06시부터 1초씩 증가하며 입력됩니다.
        </S.TextAreaInfo>
        <S.TextAreaInfo>
          ※날짜는 송장조회 화면에서 날짜 검색으로 변경 가능합니다.
        </S.TextAreaInfo>
      </S.TextAreaInfoContainer>

      <S.TextArea name="barcode" onChange={handleRegisteredData} />

      <S.BottomContainer>
        <S.ButtonContainer>
          <CommonButton contents="확인" onClickFn={onClickRegisterButton} />
        </S.ButtonContainer>
      </S.BottomContainer>
    </S.Container>
  );
}
