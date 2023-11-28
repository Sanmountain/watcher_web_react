import styled from "styled-components";
import { colors } from "./palette";
import { font } from "./typography";

export const DeliveryStateContainer = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
`;

export const DeliveryStateText = styled.div`
  font-size: ${font.fontSize[200]};

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 15px;
`;

export const BarContainer = styled.div`
  position: relative;
  width: 80%;
  height: 5%;
  background-color: white;
  border-radius: 20px;
  margin: 0 auto;
`;

export const Dot = styled.div`
  position: absolute;
  top: -4px;
  width: 15px;
  height: 15px;
  background-color: ${colors.black[1000]};
  border: 2px solid ${colors.blue[300]};
  border-radius: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Progress = styled.div`
  position: absolute;
  height: 100%;
  background-color: ${colors.blue[300]};
  border: 1px solid ${colors.blue[300]};
  border-radius: 20px;
`;

export const DeliveryIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
  svg {
    width: 30%;
    height: 30%;
    color: ${colors.blue[300]};
  }
`;

export const DeliveryText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  color: ${colors.blue[200]};
  font-size: ${font.fontSize[600]};
`;

/* 모달 */
export const DeliveryModalContainer = styled.div`
  position: fixed; // 위치를 고정합니다.
  top: 50%; // 상단에서 부터 50%의 위치에 배치합니다.
  left: 50%; // 좌측에서 부터 50%의 위치에 배치합니다.
  transform: translate(-50%, -50%); // 중심점을 조정합니다.
  z-index: 100; // 다른 요소 위에 위치하도록 z-index를 설정합니다.

  width: 70%;
  height: 50%;

  margin: 0 auto;
  background: white; // 배경색을 지정합니다.
`;

export const DeliveryModalHeader = styled.div`
  font-size: 900;
`;

export const ModalOverlay = styled.div`
  position: fixed; // 위치를 고정합니다.
  top: 0; // 상단에 붙입니다.
  left: 0; // 좌측에 붙입니다.
  right: 0; // 우측에 붙입니다.
  bottom: 0; // 하단에 붙입니다.
  background: rgba(0, 0, 0, 0.5); // 반투명한 검은색 배경을 만듭니다.
  z-index: 99; // 모달창 바로 아래에 위치하도록 z-index를 설정합니다.
`;
