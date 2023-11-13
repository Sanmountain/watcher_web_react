import styled from "styled-components";
import { font } from "./typography";
import { colors } from "./palette";

export const ModalContainer = styled.div`
  position: fixed;
  top: 70px;
  left: 10px;

  background-color: ${colors.black[1000]};
  border-radius: 10px;
  overflow: hidden;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  z-index: 9999;
  cursor: grab;

  &.modalContainer-medium {
    width: 500px;
    height: 500px;
  }

  &.modalContainer-small {
    width: 300px;
    height: 300px;
  }

  &.modalContainer-large {
    width: 800px;
    height: 800px;
  }
`;

export const CloseModal = styled.button`
  position: fixed;
  top: 10px;
  background-color: transparent;
  color: ${colors.blue[300]};
  font-weight: bold;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: min-content;
  cursor: pointer;

  &.closeModal-medium {
    left: 470px;
  }

  &.closeModal-small {
    left: 270px;
  }

  &.closeModal-large {
    left: 770px;
  }
`;

export const BarcodeImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.25s ease;
  transform-origin: center center;
  cursor: grab;
`;

export const ImageControlButton = styled.button`
  position: fixed;
  top: 10px;
  padding: 5px 10px;
  font-size: ${font.fontSize[300]};
  background-color: ${colors.blue[300]};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &.zoomBtn {
    left: 10px;
  }

  &.shrinkBtn {
    left: 80px;
  }

  &.rotateBtn {
    left: 150px;
  }
`;

export const BrightnessInfo = styled.div`
  position: fixed;
  left: 230px;
  top: 18px;
  font-size: ${font.fontSize[300]};
  font-weight: bold;
  color: ${colors.blue[200]};
`;

export const BrightnessSlider = styled.input`
  position: fixed;
  left: 270px;
  top: 15px;
  width: 150px;
  height: 15px;
`;

export const Info = styled.p`
  position: fixed;
  color: ${colors.blue[300]};
  font-size: ${font.fontSize[300]};
  font-weight: bold;
  left: 10px;
  top: 50px;
`;

export const PopupInfo = styled.p`
  position: fixed;
  bottom: 15px;
  left: 10px;
  font-size: ${font.fontSize[300]};
  color: ${colors.blue[300]};
  font-weight: bold;
`;

export const SizeButton = styled.button`
  position: fixed;
  bottom: 10px;
  padding: 5px 10px;
  background-color: ${colors.blue[300]};
  color: white;
  font-size: ${font.fontSize[300]};
  font-weight: bold;
  border: none;
  border-radius: 5px;
  width: 30px;
  cursor: pointer;

  &.sizeUp {
    left: 80px;
  }

  &.sizeDown {
    left: 120px;
  }

  &.sizeBack {
    left: 160px;
  }
`;
