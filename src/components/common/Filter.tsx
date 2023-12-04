import { ChangeEvent, useEffect, useState } from "react";
import * as S from "../../styles/Filter.styles";
import CommonButton from "./CommonButton";
import { useLocation } from "react-router";
import {
  getImagePage,
  getVassPage,
  getWorkPage,
} from "../../utils/getLocationPath";
import { IFilterProps } from "../../types/Filter.types";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { workListState } from "../../stores/work/workListState";
import { vassListState } from "../../stores/vass/vassListState";
import InvoiceRegisterModal from "./InvoiceRegisterModal";
import { sendInvoice } from "../../api/work/sendInvoice";
import Loading from "./Loading";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { getAutoCheck } from "../../api/work/getAutoCheck";
import { getAutoChange } from "../../api/work/getAutoChange";
import { loginState } from "../../stores/loginState";
import TmDvEditModal from "./TmDvEditModal";
import { excelDownload } from "../../utils/excelDownload";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { workPageState } from "../../stores/work/workPageState";

export default function Filter({
  filterOption,
  setFilterOption,
  dateMutate,
  isDateMutateSuccess,
  invoiceMutate,
  checkedItems,
  setCheckedItems,
  setAllChecked,
  total,
}: IFilterProps) {
  const login = useRecoilValue(loginState);
  const [isDisplayRegisterModal, setIsDisplayRegisterModal] = useState(false);
  // NOTE 토글
  const [isOn, setIsOn] = useState(false);
  // NOTE 업무수정 모달
  const [isOpen, setIsOpen] = useState(false);
  // NOTE 페이지네이션
  const setPage = useSetRecoilState(workPageState);

  const [workList, setWorkList] = useRecoilState(workListState);
  const vassList = useRecoilValue(vassListState);

  const location = useLocation();

  const WORK_PAGE = getWorkPage(location);
  const VASS_PAGE = getVassPage(location);
  const IMAGE_PAGE = getImagePage(location);

  // NOTE auto 체크
  const { mutate: autoCheckMutate } = getAutoCheck(setIsOn);
  // NOTE 자동수동 변환
  const { mutate: autoChangeMutate } = getAutoChange(isOn, setIsOn);
  // NOTE i전송
  const { mutate: sendInvoiceMutate, isLoading: isSendInvoiceLoading } =
    sendInvoice();

  // NOTE  Auto 체크
  useEffect(() => {
    if (login.company === "LOGEN") autoCheckMutate();
  }, []);

  useEffect(() => {
    if (isDateMutateSuccess) {
      Swal.fire({
        icon: "success",
        title: "조회가 완료되었습니다.",
        confirmButtonText: "확인",
      });
    }
  }, [isDateMutateSuccess]);

  const handleFilter = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFilterOption({ ...filterOption, [name]: value });
  };

  const onClickDateSearch = () => {
    dateMutate("1");
    setFilterOption({ ...filterOption, invoiceNumber: "" });
    setPage("1");
    setWorkList([]);

    if (setCheckedItems && setAllChecked) {
      setCheckedItems([]);
      setAllChecked(false);
    }
  };

  const onClickInvoiceSearch = () => {
    invoiceMutate();
    setFilterOption({
      ...filterOption,
      receivingShipment: "all",
      date: dayjs().format("YYYY-MM-DD"),
    });
    setPage("1");

    if (setCheckedItems && setAllChecked) {
      setCheckedItems([]);
      setAllChecked(false);
    }
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

  // NOTE i롯데,알프스 전송
  const onClickSendInvoice = () => {
    sendInvoiceMutate();
  };

  // NOTE 업무 수정
  const handleEditTmDv = () => {
    setIsOpen(true);
  };

  const handleDownloadExcel = () => {
    excelDownload(login.branchName, filterOption, workList);
  };

  return (
    <>
      <S.Container $isWorkPage={WORK_PAGE}>
        <S.FilterContainer
          className="item1"
          $isLogen={login.company === "LOGEN"}
        >
          <S.FilterTitle>스캔수량</S.FilterTitle>{" "}
          {(WORK_PAGE && numberWithCommas(total || 0)) ||
            (VASS_PAGE && numberWithCommas(vassList.length)) ||
            (IMAGE_PAGE && numberWithCommas(vassList.length)) ||
            0}{" "}
          건{" "}
          <S.SelectBox
            name="receivingShipment"
            value={filterOption.receivingShipment}
            onChange={handleFilter}
          >
            {login.company === "LOGEN" && (
              <>
                <option value="all">전체</option>
                <option value="receive">배송입고</option>
                <option value="shipment">집하출고</option>
              </>
            )}
            {login.company === "LOTTE" && (
              <>
                <option value="all">전체</option>
                <option value="receive">도착</option>
                <option value="shipment">발송</option>
              </>
            )}

            {login.company === "HANJIN" && (
              <>
                <option value="all">전체</option>
                <option value="receive">간선상차</option>
                <option value="shipment">간선하차</option>
              </>
            )}
            {login.company === "HANDEX" && (
              <>
                <option value="all">전체</option>
                <option value="receive">영업소상차</option>
                <option value="shipment">영업소하차</option>
                <option value="goods">상품집하</option>
              </>
            )}
          </S.SelectBox>
          <S.Input
            className="date"
            type="date"
            name="date"
            value={filterOption.date}
            onChange={handleFilter}
          />
          <CommonButton
            contents="검색"
            onClickFn={onClickDateSearch}
            height="100%"
            backgroundColor="#010163"
          />
        </S.FilterContainer>

        <S.FilterContainer
          className="item2"
          $isLogen={login.company === "LOGEN"}
        >
          <S.FilterTitle>송장조회</S.FilterTitle>
          <S.Input
            placeholder="송장번호 입력"
            name="invoiceNumber"
            value={filterOption.invoiceNumber}
            onChange={handleFilter}
          />
          <CommonButton
            contents="검색"
            onClickFn={onClickInvoiceSearch}
            height="100%"
            backgroundColor="#010163"
          />
        </S.FilterContainer>

        {!VASS_PAGE && !IMAGE_PAGE && (
          <S.FilterContainer
            className="register item3"
            $isLogen={login.company === "LOGEN"}
          >
            {login.company === "LOGEN" && (
              <S.RegisterContainer>
                <S.FilterTitle className="autoBtn"> 자동여부</S.FilterTitle>
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
                <S.ToggleLabel>{isOn ? "자동" : "수동"}</S.ToggleLabel>
              </S.RegisterContainer>
            )}

            {login.company === "LOGEN" && (
              <S.RegisterContainer>
                <CommonButton
                  contents="송장 등록"
                  onClickFn={onClickRegisterInvoice}
                  height="100%"
                  backgroundColor="green"
                />
                <CommonButton
                  contents="아이로젠 바로 전송"
                  onClickFn={onClickSendInvoice}
                  height="100%"
                  backgroundColor="green"
                />
              </S.RegisterContainer>
            )}

            {login.company === "LOTTE" && (
              <S.RegisterContainer>
                <CommonButton
                  contents="송장 등록"
                  onClickFn={onClickRegisterInvoice}
                  height="100%"
                  backgroundColor="green"
                />
                <CommonButton
                  contents="알프스 바로 전송"
                  onClickFn={onClickSendInvoice}
                  height="100%"
                  backgroundColor="green"
                />
              </S.RegisterContainer>
            )}
            <S.RegisterContainer>
              <CommonButton
                contents="업무 수정"
                onClickFn={handleEditTmDv}
                height="100%"
                backgroundColor="#010163"
              />
              <CommonButton
                contents="엑셀다운"
                onClickFn={handleDownloadExcel}
                backgroundColor="#010163"
              />
            </S.RegisterContainer>
          </S.FilterContainer>
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

      {isOpen && (
        <TmDvEditModal
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}
