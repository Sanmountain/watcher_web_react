import { useRecoilValue } from "recoil";
import * as S from "../../styles/InvoiceRegisterModal.styles";
import { IInvoiceRegisterModalProps } from "../../types/InvoiceRegisterModal.types";
import CommonButton from "./CommonButton";
import { workFilterState } from "../../stores/work/workFilterState";
import dayjs from "dayjs";
import { loginState } from "../../stores/loginState";
import { ChangeEvent, useState } from "react";
import { IRegisteredData } from "../../types/registerInvoice.types";
import { registerInvoice } from "../../api/work/registerInvoice";

export default function InvoiceRegisterModal({
  setIsDisplayRegisterModal,
}: IInvoiceRegisterModalProps) {
  const filterOption = useRecoilValue(workFilterState);
  const login = useRecoilValue(loginState);
  const [registeredData, setRegisteredData] = useState<IRegisteredData>({
    tm_dv: filterOption.receivingShipment === "receive" ? "21" : "20",
    scandate: filterOption.date,
    bran_cd: login.userId,
    car_num: "",
    emp_cd: "",
    tg_bran_cd: "",
    pob: "",
    barcode: "",
  });

  const { mutate: registerInvoiceMutate } = registerInvoice();

  const onClickCloseButton = () => {
    setIsDisplayRegisterModal(false);
  };

  // NOTE 사원, 영업소, 상대, 차량번호 onChange
  const handleRegisteredData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

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

    setIsDisplayRegisterModal(false);
  };

  return (
    <S.Container>
      <S.TopContainer>
        송장 등록
        <S.CloseIcon onClick={onClickCloseButton} />
      </S.TopContainer>

      <S.InfoContainer>
        <S.LeftRightContainer>
          <S.TitleInputContainer>
            <S.Title>업무분류</S.Title>
            <S.Info>{registeredData.tm_dv}</S.Info>
          </S.TitleInputContainer>
          <S.TitleInputContainer>
            <S.Title>날짜</S.Title>
            <S.Info>
              {dayjs(registeredData.scandate).format("YYYY-MM-DD")}
            </S.Info>
          </S.TitleInputContainer>
          <S.TitleInputContainer>
            <S.Title>사업장</S.Title>
            <S.Info>{registeredData.bran_cd}</S.Info>
          </S.TitleInputContainer>
        </S.LeftRightContainer>
        <S.LeftRightContainer>
          <S.TitleInputContainer>
            <S.Title>사원</S.Title>
            {registeredData?.emp_cd ? (
              <S.InfoSelectBox
                name="emp_cd"
                onChange={handleRegisteredData}
              ></S.InfoSelectBox>
            ) : (
              <S.InfoInput name="emp_cd" onChange={handleRegisteredData} />
            )}
          </S.TitleInputContainer>
          <S.TitleInputContainer>
            <S.Title>영업소</S.Title>
            {registeredData?.tg_bran_cd ? (
              <S.InfoSelectBox
                name="tg_bran_cd"
                onChange={handleRegisteredData}
              ></S.InfoSelectBox>
            ) : (
              <S.InfoInput name="tg_bran_cd" onChange={handleRegisteredData} />
            )}
          </S.TitleInputContainer>
          <S.TitleInputContainer>
            <S.Title>상대</S.Title>
            {registeredData?.pob ? (
              <S.InfoSelectBox
                name="pob"
                onChange={handleRegisteredData}
              ></S.InfoSelectBox>
            ) : (
              <S.InfoInput name="pob" onChange={handleRegisteredData} />
            )}
          </S.TitleInputContainer>
          <S.TitleInputContainer>
            <S.Title>차량번호</S.Title>
            {registeredData?.car_num ? (
              <S.InfoSelectBox
                name="car_num"
                onChange={handleRegisteredData}
              ></S.InfoSelectBox>
            ) : (
              <S.InfoInput name="car_num" onChange={handleRegisteredData} />
            )}
          </S.TitleInputContainer>
        </S.LeftRightContainer>
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
