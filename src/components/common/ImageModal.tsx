import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import * as S from "../../styles/ImageModal.styles";
import Draggable from "react-draggable";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

interface IImageModalProps {
  imageUrl: string;
  setIsDisplayImageModal: Dispatch<SetStateAction<boolean>>;
}

export default function ImageModal({
  imageUrl,
  setIsDisplayImageModal,
}: IImageModalProps) {
  const [rotation, setRotation] = useState(180);
  const [modalSize, setModalSize] = useState("medium");

  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current)
      imgRef.current.style.transform = `rotate(${rotation}deg)`;
  }, [rotation]);

  const handleCloseModal = () => {
    setIsDisplayImageModal(false);
  };

  const handleRotate = () => {
    setRotation(rotation + 90);
  };

  const handleSizeUp = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModalSize("large");
  };

  const handleSizeDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModalSize("small");
  };

  const handleSizeBack = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModalSize("medium");
  };

  return (
    <Draggable handle="#modalContainer" cancel=".react-transform-wrapper">
      <S.ModalContainer
        id="modalContainer"
        className={`modalContainer-${modalSize}`}
      >
        <S.CloseModal
          className={`closeModal-${modalSize}`}
          onClick={handleCloseModal}
        >
          X
        </S.CloseModal>

        <TransformWrapper initialScale={1}>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <TransformComponent>
                <S.BarcodeImage
                  src={imageUrl}
                  alt="바코드"
                  ref={imgRef}
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
              </TransformComponent>

              <S.ImageControlButton
                className="zoomBtn"
                onClick={() => zoomIn()}
              >
                + 확대
              </S.ImageControlButton>
              <S.ImageControlButton
                className="shrinkBtn"
                onClick={() => zoomOut()}
              >
                - 축소
              </S.ImageControlButton>
              <S.ImageControlButton
                className="rotateBtn"
                onClick={handleRotate}
              >
                ↷ 회전
              </S.ImageControlButton>

              <S.Info>마우스 휠로 확대, 축소가 가능합니다.</S.Info>

              <S.PopupInfo>팝업크기</S.PopupInfo>
              <S.SizeButton
                className="sizeUp"
                onClick={(e) => {
                  handleSizeUp(e);
                  resetTransform();
                }}
              >
                +
              </S.SizeButton>
              <S.SizeButton
                className="sizeDown"
                onClick={(e) => {
                  handleSizeDown(e);
                  resetTransform();
                }}
              >
                -
              </S.SizeButton>
              <S.SizeButton
                className="sizeBack"
                onClick={(e) => {
                  handleSizeBack(e);
                  resetTransform();
                }}
              >
                ↺
              </S.SizeButton>
            </>
          )}
        </TransformWrapper>
      </S.ModalContainer>
    </Draggable>
  );
}
