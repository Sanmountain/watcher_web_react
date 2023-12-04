import { useRecoilValue } from "recoil";
import * as S from "../../../styles/TmDvEditModal.styles";
import { ITmDvEditModalProps } from "../../../types/TmDvEditModal.types";
import CommonButton from "../CommonButton";
import { loginState } from "../../../stores/loginState";
import { ChangeEvent, useState } from "react";
import { editTmDv } from "../../../api/admin/editTmDv";
import { getWorkDateList } from "../../../api/work/getWorkDateList";
import Swal from "sweetalert2";
import { sendInvoice } from "../../../api/work/sendInvoice";
import Loading from "../Loading";

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

  // NOTE list refetch
  const { mutate: workDateListMutate } = getWorkDateList();
  // NOTE i로젠, 알프스
  const { mutate: sendInvoiceMutate, isLoading: isSendInvoiceLoading } =
    sendInvoice(isTmDvModal, setIsOpen);

  const { mutate: editTmDvMutate, isLoading: isEditTmDvLoading } = editTmDv(
    checkedItems,
    setCheckedItems,
    changedTmDv,
    workDateListMutate,
    sendInvoiceMutate,
  );

  const handleClose = () => {
    setIsOpen(false);
    setChangedTmDv("");
  };

  const handleSelectBox = (e: ChangeEvent<HTMLSelectElement>) => {
    setChangedTmDv(e.target.value);
  };

  const handleClickChangeTmDv = () => {
    if (checkedItems) {
      // NOTE 선택한 송장리스트가 없을 경우 return처리
      if (checkedItems.length < 1) {
        Swal.fire({
          icon: "warning",
          title: "수정할 송장번호를 선택해주세요.",
          confirmButtonText: "확인",
        });
        return;
      }
    }

    editTmDvMutate();
  };

  return (
    <S.Container>
      <S.TopContainer>
        <S.CloseIcon onClick={handleClose} />
      </S.TopContainer>
      <S.ContentsContainer>
        <S.Title>업무구분 수정</S.Title>
        <S.Count>{checkedItems?.length} 건</S.Count>
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
        {(isSendInvoiceLoading || isEditTmDvLoading) && <Loading />}
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
