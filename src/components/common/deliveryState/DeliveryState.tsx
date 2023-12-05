import { useState, useEffect } from "react";
import { FaBoxesPacking, FaTruckFast } from "react-icons/fa6";
import { MdWarehouse } from "react-icons/md";
import * as S from "../../../styles/DeliveryState.styles";
import { useRecoilValue } from "recoil";
import { vassTrackingState } from "../../../stores/vass/vassTrackingState";
import { getVassTracking } from "../../../api/vass/getVassTracking";

export default function DeliveryState() {
  const { mutate: vasslist } = getVassTracking();
  useEffect(() => {
    vasslist();
  }, []);
  const vassTrackingData = useRecoilValue(vassTrackingState);

  // NOTE 배송상태
  const [deliveryState, setDeliveryState] = useState("");

  useEffect(() => {
    if (vassTrackingData.trace_list && vassTrackingData.trace_list.length > 0) {
      const lastState =
        vassTrackingData?.trace_list[vassTrackingData?.trace_list.length - 1]
          .state_nm;
      setDeliveryState(lastState);
    }
  }, [vassTrackingData]);

  // NOTE 배송상태(아이콘)
  const levelIcons = [
    <FaBoxesPacking key="FaBoxesPacking" />,
    <MdWarehouse key="MdWarehouse" />,
    <FaTruckFast key="FaTruckFast" />,
  ];

  const levelIcon = vassTrackingData.level
    ? levelIcons[parseInt(vassTrackingData.level, 10) - 1]
    : null;

  // 배송 상태에 따른 dot의 위치를 결정하는 percent 변수
  let percent = 0;
  if (vassTrackingData.level) {
    percent = ((parseInt(vassTrackingData.level, 10) - 1) / (8 - 1)) * 310;
  }

  // progress 바의 너비를 결정하는 progressWidth 변수
  let progressWidth = 0;
  if (vassTrackingData.level) {
    progressWidth = percent;
  }

  return (
    <S.DeliveryStateContainer>
      <S.DeliveryStateText>이전 송장번호 배송추적</S.DeliveryStateText>
      <S.BarContainer>
        <S.Progress style={{ width: `${progressWidth}%` }}></S.Progress>
        <S.Dot style={{ left: `${percent}%` }}></S.Dot>
      </S.BarContainer>
      <S.DeliveryIcon>{levelIcon}</S.DeliveryIcon>
      <S.DeliveryText>{deliveryState}</S.DeliveryText>
    </S.DeliveryStateContainer>
  );
}
