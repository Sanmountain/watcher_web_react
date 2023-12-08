import * as S from "../../../styles/DeliveryState.styles";
import { useRecoilValue } from "recoil";
import { vassTrackingState } from "../../../stores/vass/vassTrackingState";
import { useEffect } from "react";

interface Props {
  barcode: string | undefined;
  onClose: () => void;
}

export default function DeliveryModal({ onClose, barcode }: Props) {
  const vassTrackingData = useRecoilValue(vassTrackingState);

  const headers = ["날짜", "시간", "사업장", "배송상태"];

  useEffect(() => {}, [barcode]);

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
              <td>{vassTrackingData.relation_list[0].iv_no_relation}</td>
              <td>상품명</td>
              <td>
                {vassTrackingData.goods_nm.slice(0, 2) +
                  "*".repeat(
                    Math.max(
                      0,
                      Math.min(5, vassTrackingData.goods_nm.length - 2),
                    ),
                  )}
              </td>
            </tr>
            <tr>
              <td>집하일자</td>
              <td>{vassTrackingData.pick_date}</td>
              <td>배송지점</td>
              <td>{vassTrackingData.dv_trade_nm}</td>
            </tr>
            <tr>
              <td>집하지점</td>
              <td>{vassTrackingData.pick_trade_nm}</td>
              <td>수량</td>
              <td>{vassTrackingData.qa}</td>
            </tr>
            <tr>
              <td>보내시는 분</td>
              <td>
                {vassTrackingData.cust_nm.slice(0, 1) +
                  "*".repeat(Math.min(3, vassTrackingData.cust_nm.length - 1))}
              </td>
              <td>받으시는 분</td>
              <td>
                {vassTrackingData.dv_nm.slice(0, 1) +
                  "*".repeat(Math.min(3, vassTrackingData.dv_nm.length - 1))}
              </td>
            </tr>
            <tr>
              <td>주소</td>
              <td colSpan={3}>{vassTrackingData.dv_address_jibun}</td>
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
            {vassTrackingData.trace_list.map((item, index) => (
              <tr key={index}>
                <td>{item.scan_date}</td>
                <td>{item.scan_time}</td>
                <td>{item.trade_nm}</td>
                <td>{item.state_nm}</td>
              </tr>
            ))}
          </tbody>
        </S.DeliveryTable>
        <S.DeliveryTableHeader>배송 영업소 정보</S.DeliveryTableHeader>
        <S.DeliveryTable>
          <tbody>
            <tr>
              <td>최종처리시간</td>
              <td>
                {`${
                  vassTrackingData.trace_list[
                    vassTrackingData.trace_list.length - 1
                  ].scan_date
                } 
                ${
                  vassTrackingData.trace_list[
                    vassTrackingData.trace_list.length - 1
                  ].scan_time
                } 
                ${
                  vassTrackingData.trace_list[
                    vassTrackingData.trace_list.length - 1
                  ].state_nm
                }`}
              </td>
              <td>배송예정시간</td>
              <td>
                {vassTrackingData.trace_list[
                  vassTrackingData.trace_list.length - 2
                ]?.dv_time_nm || ""}
              </td>
            </tr>
            <tr>
              <td>최종처리 사업장</td>
              <td>
                {
                  vassTrackingData.trace_list[
                    vassTrackingData.trace_list.length - 1
                  ].trade_nm
                }
              </td>
              <td>연락처</td>
              <td>{vassTrackingData.dv_tradesub_tel}</td>
            </tr>
            <tr>
              <td>영업사원</td>
              <td colSpan={3}>{vassTrackingData.dv_tradesub_nm}</td>
            </tr>
          </tbody>
        </S.DeliveryTable>
      </S.DeliveryModalContainer>
    </>
  );
}
