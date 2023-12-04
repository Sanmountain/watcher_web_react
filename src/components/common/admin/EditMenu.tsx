import { useRecoilValue } from "recoil";
import * as S from "../../../styles/Admin.styles";
import { loginState } from "../../../stores/loginState";
import CommonButton from "../CommonButton";
import { excelDownload } from "../../../utils/excelDownload";
import { ChangeEvent, useState } from "react";
import { IWorkListData } from "../../../types/Work.types";
import dayjs from "dayjs";
import { getInvoiceList } from "../../../api/admin/getInvoiceList";
import { getDateList } from "../../../api/admin/getDateList";
import TmDvEditModal from "./TmDvEditModal";
import Loading from "../Loading";

export default function EditMenu() {
  const login = useRecoilValue(loginState);
  const [date, setDate] = useState({
    select: "all",
    date: dayjs().format("YYYY-MM-DD"),
  });
  const [invoice, setInvoice] = useState<null | number>(null);
  const [searchList, setSearchList] = useState<IWorkListData[]>([]);
  // NOTE 업무수정 모달
  const [isOpen, setIsOpen] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState<
    {
      barcode: string;
      scandate: string;
    }[]
  >([]);

  const { mutate: dateMutate, isLoading: isDateLoading } = getDateList(
    date,
    setSearchList,
  );
  const { mutate: invoiceMutate, isLoading: isInvoiceLoading } = getInvoiceList(
    invoice,
    setSearchList,
  );

  // NOTE 날짜 필터
  const handleDateFilter = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "select") {
      setDate({ ...date, select: value });
    } else if (name === "date") {
      setDate({ ...date, date: value });
    }
  };

  // NOTE 송장번호 필터
  const handleInvoiceFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setInvoice(Number(e.target.value));
  };

  // NOTE 날짜검색
  const handleSearchDate = () => {
    dateMutate();
    setInvoice(null);
    setCheckedItems([]);
    setAllChecked(false);
  };

  // NOTE 송장번호검색
  const handleSearchInvoice = () => {
    invoiceMutate();
    setDate({ select: "all", date: dayjs().format("YYYY-MM-DD") });
    setCheckedItems([]);
    setAllChecked(false);
  };

  // NOTE 업무 수정
  const handleEditTmDv = () => {
    setIsOpen(true);
  };

  // NOTE 체크박스 전체 선택,해제
  const handleCheckAll = () => {
    if (allChecked) {
      setCheckedItems([]);
    } else {
      const newCheckedItems = searchList.map((item) => ({
        barcode: item.barcode,
        scandate: item.scandate,
      }));
      setCheckedItems(newCheckedItems);
    }
    setAllChecked(!allChecked);
  };

  // NOTE 체크박스 개별 선택,해제
  const handleCheckItem = (barcode: string, scandate: string) => {
    if (checkedItems && setCheckedItems && setAllChecked) {
      const newCheckedItems = checkedItems.some(
        (item) => item.barcode === barcode && item.scandate === scandate,
      )
        ? checkedItems.filter(
            (item) => item.barcode !== barcode || item.scandate !== scandate,
          )
        : [...checkedItems, { barcode, scandate }];

      setCheckedItems(newCheckedItems);

      // NOTE 모든 checkbox 체크 된 경우 전체 선택 체크박스 체크
      setAllChecked(newCheckedItems.length === searchList.length);
    }
  };

  // NOTE 엑셀 다운
  const handleDownloadExcel = () => {
    excelDownload(login.branchName, date.date, searchList);
  };

  return (
    <>
      <S.TitleToggleContainer className="edit">
        <S.FilterContainer>
          <S.InputButtonContainer>
            <div>{searchList.length} 건</div>
            <S.SelectBox name="select" onChange={(e) => handleDateFilter(e)}>
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
              type="date"
              className="date"
              value={date.date}
              name="date"
              onChange={(e) => handleDateFilter(e)}
            />
            <CommonButton
              contents="검색"
              onClickFn={handleSearchDate}
              backgroundColor="#010163"
              height="85%"
            />
          </S.InputButtonContainer>
          <S.InputButtonContainer>
            <S.Input
              type="number"
              value={invoice || ""}
              onChange={(e) => handleInvoiceFilter(e)}
              placeholder="송장번호"
            />
            <CommonButton
              contents="검색"
              onClickFn={handleSearchInvoice}
              backgroundColor="#010163"
              height="85%"
            />
          </S.InputButtonContainer>
          <S.InputButtonContainer className="edit">
            <CommonButton
              contents="업무 수정"
              onClickFn={handleEditTmDv}
              height="85%"
            />
            <CommonButton
              contents="엑셀 다운"
              onClickFn={handleDownloadExcel}
              height="85%"
            />
          </S.InputButtonContainer>
        </S.FilterContainer>
        <S.TableTitleContainer>
          <input
            type="checkbox"
            checked={allChecked}
            disabled={searchList.length < 1}
            onChange={handleCheckAll}
          />
          <div>업무구분</div>
          <div>날짜</div>
          <div>송장번호</div>
        </S.TableTitleContainer>
        <S.ContentsList>
          {isDateLoading || isInvoiceLoading ? (
            <Loading />
          ) : (
            searchList.map((el) => (
              <S.ContentsContainer key={el.id}>
                <input
                  type="checkbox"
                  id={`checkbox-${el.id}`}
                  checked={checkedItems?.some(
                    (checkedItem) =>
                      checkedItem.barcode === el.barcode &&
                      checkedItem.scandate === el.scandate,
                  )}
                  onChange={() => handleCheckItem(el.barcode, el.scandate)}
                />
                <S.Contents>{el.tm_dv}</S.Contents>
                <S.Contents>{el.scan_total_time}</S.Contents>
                <S.Contents>{el.barcode}</S.Contents>
              </S.ContentsContainer>
            ))
          )}
        </S.ContentsList>
      </S.TitleToggleContainer>

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
