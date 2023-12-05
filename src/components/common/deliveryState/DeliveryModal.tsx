import * as S from "../../../styles/DeliveryState.styles";

export default function DeliveryModal({ onClose }: { onClose: () => void }) {
  const headers = [
    "날짜",
    "사업장",
    "배송상태",
    "배송내용",
    "담당직원",
    "인수자",
    "영업소",
    "연락처",
  ];

  const data = [
    {
      날짜: "2023-12-05",
      사업장: "A사업장",
      배송상태: "배송중",
      배송내용: "상품A",
      담당직원: "홍길동",
      인수자: "이순신",
      영업소: "서울영업소",
      연락처: "010-1234-5678",
    },
    // 추가적인 데이터...
  ];

  return (
    <>
      <S.ModalOverlay onClick={onClose} />
      <S.DeliveryModalContainer>
        <S.DeliveryModalHeader>
          이전 송장번호 배송추적<S.CloseBtn onClick={onClose}>x</S.CloseBtn>
        </S.DeliveryModalHeader>
        <S.DeliveryTableHeader>물품정보</S.DeliveryTableHeader>
        <S.DeliveryTable>
          <tbody>
            <tr>
              <td>송장번호</td>
              <td>369-7476-9775</td>
              <td>상품명</td>
              <td>아*********</td>
            </tr>
            <tr>
              <td>집하일자</td>
              <td>2023-12-04</td>
              <td>배송지점</td>
              <td>예천</td>
            </tr>
            <tr>
              <td>집하지점</td>
              <td>기장</td>
              <td>수량</td>
              <td>1</td>
            </tr>
            <tr>
              <td>보내시는 분</td>
              <td>자**</td>
              <td>받으시는 분</td>
              <td>조**</td>
            </tr>
            <tr>
              <td>주소</td>
              <td>경북 예천군 호명면</td>
            </tr>
          </tbody>
        </S.DeliveryTable>
        <S.DeliveryTableHeader>배송정보</S.DeliveryTableHeader>
        <S.DeliveryTable>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.날짜}</td>
                <td>{item.사업장}</td>
                <td>{item.배송상태}</td>
                <td>{item.배송내용}</td>
                <td>{item.담당직원}</td>
                <td>{item.인수자}</td>
                <td>{item.영업소}</td>
                <td>{item.연락처}</td>
              </tr>
            ))}
          </tbody>
        </S.DeliveryTable>
        <S.DeliveryTableHeader>배송 영업소 정보</S.DeliveryTableHeader>
        <S.DeliveryTable>
          <tbody>
            <tr>
              <td>최종처리시간</td>
              <td>2023.12.05 12:11 배송완료</td>
              <td>배송예정시간</td>
              <td>18시~21시</td>
            </tr>
            <tr>
              <td>최종처리 사업장</td>
              <td>예천</td>
              <td>연락처1</td>
              <td>0506-1133-544</td>
            </tr>
            <tr>
              <td>영업사원</td>
              <td>동일★안승영</td>
              <td>연락처2</td>
              <td>010-6566-4785</td>
            </tr>
          </tbody>
        </S.DeliveryTable>
      </S.DeliveryModalContainer>
    </>
  );
}
