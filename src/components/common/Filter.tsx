import { ChangeEvent, useState } from "react";
import * as S from "../../styles/Filter.styles";
import CommonButton from "./CommonButton";
import { useLocation } from "react-router";
import { getVassPage, getWorkPage } from "../../utils/getLocationPath";
import { IFilterProps } from "../../types/Filter.types";
import { useRecoilValue } from "recoil";
import { workListState } from "../../stores/work/workListState";
import { vassListState } from "../../stores/vass/vassListState";
import InvoiceRegisterModal from "./InvoiceRegisterModal";
import { sendInvoice } from "../../api/work/sendInvoice";
import Loading from "./Loading";

export default function Filter({
  filterOption,
  setFilterOption,
  dateMutate,
  invoiceMutate,
}: IFilterProps) {
  const [isDisplayRegisterModal, setIsDisplayRegisterModal] = useState(false);

  const workList = useRecoilValue(workListState);
  const vassList = useRecoilValue(vassListState);

  const location = useLocation();

  const WORK_PAGE = getWorkPage(location);
  const VASS_PAGE = getVassPage(location);

  const { mutate: sendInvoiceMutate, isLoading: isSendInvoiceLoading } =
    sendInvoice();

  const handleFilter = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFilterOption({ ...filterOption, [name]: value });
  };

  const onClickDateSearch = () => {
    dateMutate();
  };

  const onClickInvoiceSearch = () => {
    invoiceMutate();
  };

  // NOTE 송장등록
  const onClickRegisterInvoice = () => {
    setIsDisplayRegisterModal(true);
  };

  // NOTE i롯데 전송
  const onClickSendInvoice = () => {
    sendInvoiceMutate();
  };

  return (
    <>
      <S.Container $isWorkPage={WORK_PAGE}>
        <S.FilterContainer>
          <S.FilterTitle>스캔수량</S.FilterTitle>{" "}
          {(WORK_PAGE && workList.length) ||
            (VASS_PAGE && vassList.length) ||
            0}{" "}
          건{" "}
          <S.SelectBox
            name="receivingShipment"
            defaultValue={filterOption.receivingShipment}
            onChange={handleFilter}
          >
            <option value="shipment">배송입고</option>
            <option value="receive">집하출고</option>
          </S.SelectBox>
          <S.Input
            type="date"
            name="date"
            defaultValue={filterOption.date}
            onChange={handleFilter}
          />
          <S.ButtonContainer>
            <CommonButton contents="검색" onClickFn={onClickDateSearch} />
          </S.ButtonContainer>
        </S.FilterContainer>

        <S.FilterContainer>
          <S.FilterTitle>송장조회</S.FilterTitle>
          <S.Input
            placeholder="송장번호 입력"
            name="invoiceNumber"
            defaultValue={filterOption.invoiceNumber}
            onChange={handleFilter}
          />
          <S.ButtonContainer>
            <CommonButton contents="검색" onClickFn={onClickInvoiceSearch} />
          </S.ButtonContainer>
        </S.FilterContainer>

        {!VASS_PAGE && (
          <>
            <S.FilterContainer className="noDisplay" />
            <S.FilterContainer className="register">
              <S.SubmitButtonContainer>
                <CommonButton
                  contents="송장 등록"
                  onClickFn={onClickRegisterInvoice}
                />
              </S.SubmitButtonContainer>
              <S.SubmitButtonContainer>
                <CommonButton
                  contents="i롯데 전송"
                  onClickFn={onClickSendInvoice}
                />
              </S.SubmitButtonContainer>
            </S.FilterContainer>
          </>
        )}
      </S.Container>

      {isDisplayRegisterModal && (
        <InvoiceRegisterModal
          setIsDisplayRegisterModal={setIsDisplayRegisterModal}
        />
      )}

      {isSendInvoiceLoading && (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      )}
    </>
  );
}
