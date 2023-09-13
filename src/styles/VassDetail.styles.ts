import styled from "styled-components";
import { colors } from "./palette";
import { font } from "./typography";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 99.4%;
`;

export const VideoControllerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  gap: 30px;
  margin-bottom: 30px;
`;

export const Controller = styled.button`
  background-color: ${colors.black[200]};
  border: none;
  color: ${colors.black[1000]};
  font-size: ${font.fontSize[200]};
  font-weight: 700;
  padding: 6px 15px;
  border-radius: 10px;
  cursor: pointer;
`;

export const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: flex-start;
`;

export const SettingButton = styled.button<{ $isSettingOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.$isSettingOpen ? `${colors.black[200]}` : "transparent"};
  border: ${(props) =>
    props.$isSettingOpen
      ? `1px solid ${colors.black[200]}`
      : `1px solid ${colors.blue[200]}`};
  color: ${(props) =>
    props.$isSettingOpen ? `${colors.black[1000]}` : `${colors.blue[200]}`};
  font-size: ${font.fontSize[200]};
  font-weight: 700;
  padding: 6px 15px;
  border-radius: 10px;
  width: fit-content;
  cursor: pointer;

  &:hover {
    background-color: ${colors.black[200]};
    border: 1px solid ${colors.black[200]};
    color: ${colors.black[1000]};
  }
`;

export const DownArrowIcon = styled(BiSolidDownArrow)`
  margin-top: 2px;
  margin-left: 5px;
  pointer-events: none;
`;

export const UpArrowIcon = styled(BiSolidUpArrow)`
  margin-top: 2px;
  margin-left: 5px;
  pointer-events: none;
`;

export const SettingMenuContainer = styled.div<{ $isSettingOpen: boolean }>`
  position: absolute;
  display: ${(props) => (props.$isSettingOpen ? "flex" : "none")};
  flex-direction: column;

  border: 1px solid ${colors.black[200]};
  background-color: ${colors.black[1000]};
  border-radius: 10px;
  width: 110px;
  padding: 10px 5px;
  top: 36px;
  left: 0;
  gap: 10px;
  z-index: 2;
`;

export const SettingMenu = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  padding: 5px;
  font-size: ${font.fontSize[300]};
  cursor: pointer;

  &:hover {
    background-color: ${colors.blue[200]};
    color: ${colors.black[1000]};
    border-radius: 5px;
  }
`;

export const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  width: 100%;
`;

export const Video = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  position: relative;
`;

export const PaginationContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

export const CameraInfo = styled.div`
  position: absolute;
  top: 7px;
  left: 71%;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  padding: 10px;
  background-color: ${colors.blue[400]};
  border-radius: 10px;
  color: ${colors.black[1000]};
  font-size: ${font.fontSize[300]};
`;

export const InvoiceNumber = styled.div`
  position: absolute;
  top: 45px;
  left: 71%;

  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  width: 150px;
  gap: 5px;
  padding: 10px;
  background-color: ${colors.blue[400]};
  border-radius: 10px;
  color: ${colors.black[1000]};
  font-size: ${font.fontSize[200]};
  text-align: center;

  > p {
    display: flex;
    align-items: center;
    width: 97%;
    height: 20px;
    padding: 0 10px;
    border-radius: 5px;

    &.sameBarcode {
      background-color: red;
    }
  }
`;
