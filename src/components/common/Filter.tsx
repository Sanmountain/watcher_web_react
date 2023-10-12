import { ChangeEvent, useEffect, useState } from "react";
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
import { numberWithCommas } from "../../utils/numberWithCommas";
import { getAutoCheck } from "../../api/work/getAutoCheck";
import { getAutoChange } from "../../api/work/getAutoChange";
import { loginState } from "../../stores/loginState";

export default function Filter({
  filterOption,
  setFilterOption,
  dateMutate,
  invoiceMutate,
}: IFilterProps) {
  const login = useRecoilValue(loginState);
  const [isDisplayRegisterModal, setIsDisplayRegisterModal] = useState(false);
  // NOTE 토글
  const [isOn, setIsOn] = useState(false);

  const workList = useRecoilValue(workListState);
  const vassList = useRecoilValue(vassListState);

  const location = useLocation();

  const WORK_PAGE = getWorkPage(location);
  const VASS_PAGE = getVassPage(location);

  // NOTE auto 체크
  const { mutate: autoCheckMutate } = getAutoCheck(setIsOn);
  // NOTE 자동수동 변환
  const { mutate: autoChangeMutate } = getAutoChange(isOn, setIsOn);
  // NOTE i전송
  const { mutate: sendInvoiceMutate, isLoading: isSendInvoiceLoading } =
    sendInvoice();

  // NOTE  Auto 체크
  useEffect(() => {
    autoCheckMutate();
  }, []);

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

  // NOTE 자동,수동 변환
  const handleToggle = async () => {
    const newAutoValue = isOn ? "0" : "1";

    autoChangeMutate(newAutoValue);
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
          {(WORK_PAGE && numberWithCommas(workList.length)) ||
            (VASS_PAGE && numberWithCommas(vassList.length)) ||
            0}{" "}
          건{" "}
          <S.SelectBox
            name="receivingShipment"
            defaultValue={filterOption.receivingShipment}
            onChange={handleFilter}
          >
            {login.company === "LOGEN" && (
              <>
                <option value="receive">배송입고</option>
                <option value="shipment">집하출고</option>
              </>
            )}
            {login.company === "LOTTE" && (
              <>
                <option value="shipment">발송</option>
                <option value="receive">도착</option>
              </>
            )}
            {login.company === "HANJIN" && (
              <>
                <option value="shipment">간선하차</option>
                <option value="receive">간선상차</option>
              </>
            )}
          </S.SelectBox>
          <S.Input
            type="date"
            name="date"
            defaultValue={filterOption.date}
            onChange={handleFilter}
          />
          <S.ButtonContainer>
            <CommonButton
              contents="검색"
              onClickFn={onClickDateSearch}
              height="100%"
            />
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
            <CommonButton
              contents="검색"
              onClickFn={onClickInvoiceSearch}
              height="100%"
            />
          </S.ButtonContainer>
        </S.FilterContainer>

        {!VASS_PAGE && (
          <>
            <S.FilterContainer className="noDisplay" />
            <S.FilterContainer className="register">
              {login.company === "LOGEN" && (
                <>
                  <span id="total_count"> 자동여부</span>
                  <S.ToggleContainer onClick={handleToggle}>
                    <div
                      className={`toggle-container ${
                        isOn ? "toggle--checked" : null
                      }`}
                    />
                    <div
                      className={`toggle-circle ${
                        isOn ? "toggle--checked" : null
                      }`}
                    />
                  </S.ToggleContainer>
                  <div className="toggleLabel">{isOn ? "자동" : "수동"}</div>
                </>
              )}

              {(login.company === "LOGEN" || login.company === "LOTTE") && (
                <>
                  <S.SubmitButtonContainer>
                    <CommonButton
                      contents="송장 등록"
                      onClickFn={onClickRegisterInvoice}
                    />
                  </S.SubmitButtonContainer>
                  <S.SubmitButtonContainer>
                    <CommonButton
                      contents={
                        login.company === "LOGEN"
                          ? "아이로젠 바로 전송"
                          : "아이롯데 바로 전송"
                      }
                      onClickFn={onClickSendInvoice}
                    />
                  </S.SubmitButtonContainer>
                </>
              )}
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
