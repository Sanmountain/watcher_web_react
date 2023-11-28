import * as S from "../../../styles/DeliveryState.styles";

export default function DeliveryModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <S.ModalOverlay onClick={onClose} />
      <S.DeliveryModalContainer>
        <S.DeliveryModalHeader>이전 송장번호 배송추적</S.DeliveryModalHeader>
      </S.DeliveryModalContainer>
    </>
  );
}
