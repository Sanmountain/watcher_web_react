import { useRecoilValue } from "recoil";
import * as S from "../../styles/TmDvEditModal.styles";
import { ITmDvEditModalProps } from "../../types/TmDvEditModal.types";
import CommonButton from "./CommonButton";
import { loginState } from "../../stores/loginState";
import { ChangeEvent, useState } from "react";
import { editTmDv } from "../../api/work/editTmDv";
import { getWorkDateList } from "../../api/work/getWorkDateList";

export default function TmDvEditModal({
  checkedItems,
  setCheckedItems,
  setIsOpen,
}: ITmDvEditModalProps) {
  const login = useRecoilValue(loginState);
  const [changedTmDv, setChangedTmDv] = useState(
    login.company === "LOGEN"
      ? "60"
      : login.company === "LOTTE"
      ? "21"
      : login.company === "HANJIN"
      ? "31"
      : "15",
  );
  const [isTmDvModal] = useState(true);

  const { mutate: workDateListMutate } = getWorkDateList(isTmDvModal);

  const { mutate: editTmDvMutate } = editTmDv(
    checkedItems,
    setCheckedItems,
    changedTmDv,
    setIsOpen,
    workDateListMutate,
  );

  const handleClose = () => {
    setIsOpen(false);
    setChangedTmDv("");
  };

  const handleSelectBox = (e: ChangeEvent<HTMLSelectElement>) => {
    setChangedTmDv(e.target.value);
  };

  const handleClickChangeTmDv = () => {
    editTmDvMutate();
  };

  return (
    <S.Container>
      <S.TopContainer>
        <S.CloseIcon onClick={handleClose} />
      </S.TopContainer>
      <S.ContentsContainer>
        <S.Title>업무구분 수정</S.Title>
        {login.company === "LOGEN" && (
          <S.SelectBox onChange={handleSelectBox}>
            <option value="60">60 (배송입고)</option>
            <option value="30">30 (집하출고)</option>
          </S.SelectBox>
        )}
        {login.company === "LOTTE" && (
          <S.SelectBox onChange={handleSelectBox}>
            <option value="21">21 (도착)</option>
            <option value="20">20 (발송)</option>
          </S.SelectBox>
        )}
        {login.company === "HANJIN" && (
          <S.SelectBox onChange={handleSelectBox}>
            <option value="31">31 (간선상차)</option>
            <option value="32">32 (간선하차)</option>
          </S.SelectBox>
        )}
        {login.company === "HANDEX" && (
          <S.SelectBox onChange={handleSelectBox}>
            <option value="15">15 (영업소상차)</option>
            <option value="50">50 (영업소하차)</option>
            <option value="10">10 (상품집하)</option>
          </S.SelectBox>
        )}

        <S.ButtonContainer>
          <CommonButton
            contents="수정"
            backgroundColor="#010163"
            onClickFn={handleClickChangeTmDv}
          />
          <CommonButton
            contents="취소"
            backgroundColor="#010163"
            onClickFn={handleClose}
          />
        </S.ButtonContainer>
      </S.ContentsContainer>
    </S.Container>
  );
}
