import * as S from "../../styles/CameraModal.styles";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import CommonButton from "./CommonButton";
import { ChangeEvent } from "react";
import { ICameraModalProps } from "../../types/CameraModal.types";
import { editCameraSequence } from "../../api/vass/editCameraSequence";

export default function CameraModal({
  setIsModalOpen,
  changePlaySequence,
  setChangePlaySequence,
  editing,
  setEditing,
  setCameraInfo,
}: ICameraModalProps) {
  const { mutate: editCameraMutate } = editCameraSequence(
    setIsModalOpen,
    changePlaySequence,
    setCameraInfo,
  );

  const dragChangeCameraSequence = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(changePlaySequence);
    const reorderedItem = items[result.source.index];

    // NOTE 정렬된 항목 원래 위치에서 제거
    items.splice(result.source.index, 1);
    // NOTE 정렬된 항목을 새 위치에 삽입
    items.splice(result.destination.index, 0, reorderedItem);
    // NOTE 각 항목의 cam_seq를 해당 항목의 인덱스 +1로 설정
    items.map((item, index) => (item.cam_seq = String(index + 1)));

    setChangePlaySequence(items);
  };

  // NOTE 카메라 이름 변경
  // TODO 더블 클릭 이벤트를 처리해서 해당 카메라 편집 가능 상태로 변경
  const handleDoubleClick = (cam_id: string) => {
    setEditing((prevEditing: any) => ({ ...prevEditing, [cam_id]: true }));
  };

  // TODo 입력값에 따라 카메라 이름을 변경
  const handleCameraNameChange = (
    cam_id: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setChangePlaySequence((prev) =>
      prev.map((item) =>
        item.cam_id === cam_id
          ? { ...item, cam_name: event.target.value }
          : item,
      ),
    );
  };

  const handelCameraNameBlur = (cam_id: string) => {
    setEditing((prev) => ({ ...prev, [cam_id]: false }));
  };

  const onClickCloseButton = () => {
    setIsModalOpen(false);
  };

  const onClickSaveButton = () => {
    editCameraMutate();
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

              <S.TableBodyContainer>
                {changePlaySequence.map((item, index) => (
                  <Draggable draggableId={item.id} index={index} key={item.id}>
                    {(provided) => (
                      <S.TableContentsList
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <S.TableContentsContainer>
                          <S.TableContents>{item.cam_seq}</S.TableContents>
                          {editing[Number(item.cam_id)] ? (
                            <S.EditTableContents
                              defaultValue={item.cam_name}
                              onChange={(e) =>
                                handleCameraNameChange(item.cam_id, e)
                              }
                              onBlur={() => handelCameraNameBlur(item.cam_id)}
                            />
                          ) : (
                            <S.TableContents
                              onDoubleClick={() =>
                                handleDoubleClick(item.cam_id)
                              }
                            >
                              {item.cam_name}
                            </S.TableContents>
                          )}
                        </S.TableContentsContainer>
                      </S.TableContentsList>
                    )}
                  </Draggable>
                ))}
              </S.TableBodyContainer>

              {provided.placeholder}
            </S.TableContainer>
          )}
        </Droppable>
      </DragDropContext>

      <S.BottomContainer>
        <S.ButtonContainer>
          <CommonButton contents="저장" onClickFn={onClickSaveButton} />
        </S.ButtonContainer>
      </S.BottomContainer>
    </S.Container>
  );
}
