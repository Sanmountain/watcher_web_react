import * as S from "../../styles/CameraModal.styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CommonButton from "./CommonButton";
import { Dispatch, SetStateAction } from "react";

interface ICameraModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CameraModal({ setIsModalOpen }: ICameraModalProps) {
  const dragChangeCameraSequence = () => {
    console.log("ddd");
  };

  const onClickCloseButton = () => {
    setIsModalOpen(false);
  };

  return (
    <S.Container>
      <S.TopContainer>
        <p>카메라 설정</p>
        <S.CloseIcon onClick={onClickCloseButton} />
      </S.TopContainer>
      <DragDropContext onDragEnd={dragChangeCameraSequence}>
        <Droppable droppableId="items">
          {(provided) => (
            <S.TableContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <S.TableTitleContainer>
                <S.TableTitle>No.</S.TableTitle>
                <S.TableTitle>카메라 위치</S.TableTitle>
              </S.TableTitleContainer>

              <Draggable draggableId="items" index={0}>
                {(provided) => (
                  <S.TableContentsList
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <S.TableContentsContainer>
                      <S.TableContents>1</S.TableContents>
                      <S.TableContents>오토스캐너 START</S.TableContents>
                    </S.TableContentsContainer>
                  </S.TableContentsList>
                )}
              </Draggable>
            </S.TableContainer>
          )}
        </Droppable>
      </DragDropContext>

      <S.BottomContainer>
        <S.ButtonContainer>
          <CommonButton contents="저장" onClickFn={() => console.log("dddd")} />
        </S.ButtonContainer>
      </S.BottomContainer>
    </S.Container>
  );
}
