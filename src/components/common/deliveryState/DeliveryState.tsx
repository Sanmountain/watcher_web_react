import { useState, useEffect } from "react";
import { FaBoxesPacking, FaTruckFast } from "react-icons/fa6";
import { MdWarehouse } from "react-icons/md";
import * as S from "../../../styles/DeliveryState.styles";

export default function DeliveryState() {
  const states = [
    { id: "집하입고", icon: <FaBoxesPacking /> },
    { id: "집하출고", icon: <FaBoxesPacking /> },
    { id: "집하완료", icon: <FaBoxesPacking /> },
    { id: "터미널입고", icon: <MdWarehouse /> },
    { id: "터미널출고", icon: <MdWarehouse /> },
    { id: "터미널완료", icon: <MdWarehouse /> },
    { id: "배송입고", icon: <FaTruckFast /> },
    { id: "배송입고", icon: <FaTruckFast /> },
    { id: "배송입고", icon: <FaTruckFast /> },
  ];
  const barcodeStateIndex = 6;
  const [dotPosition, setDotPosition] = useState(0);

  useEffect(() => {
    setDotPosition(barcodeStateIndex * (100 / (states.length - 1)));
  }, [barcodeStateIndex]);

  return (
    <S.DeliveryStateContainer>
      <S.DeliveryStateText>이전 송장번호 배송추적</S.DeliveryStateText>
      <S.BarContainer>
        <S.Progress style={{ width: `${dotPosition}%` }}></S.Progress>
        <S.Dot style={{ left: `${dotPosition}%` }}></S.Dot>
      </S.BarContainer>
      <S.DeliveryIcon>{states[barcodeStateIndex].icon}</S.DeliveryIcon>
      <S.DeliveryText>{states[barcodeStateIndex].id}</S.DeliveryText>
    </S.DeliveryStateContainer>
  );
}
