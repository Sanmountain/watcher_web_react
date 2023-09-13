import { ChangeEvent } from "react";
import * as S from "../../styles/Filter.styles";
import CommonButton from "./CommonButton";
import { useLocation } from "react-router";
import { getVassPage, getWorkPage } from "../../utils/getLocationPath";
import { IFilterProps } from "../../types/Filter.types";
import { useRecoilValue } from "recoil";
import { workListState } from "../../stores/work/workListState";

export default function Filter({
  filterOption,
  setFilterOption,
  dateMutate,
  invoiceMutate,
}: IFilterProps) {
  const workList = useRecoilValue(workListState);

  const location = useLocation();

  const WORK_PAGE = getWorkPage(location);
  const VASS_PAGE = getVassPage(location);

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

  return (
    <S.Container>
      <S.FilterContainer>
        <S.FilterTitle>조회량</S.FilterTitle>{" "}
        {(WORK_PAGE && workList.length) || 0} 건{" "}
        <S.SelectBox
          name="receivingShipment"
          defaultValue={filterOption.receivingShipment}
          onChange={handleFilter}
        >
          <option value="shipment">발송</option>
          <option value="receive">도착</option>
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
        <S.FilterContainer>
          <S.SubmitButtonContainer>
            <CommonButton
              contents="송장 등록"
              onClickFn={() => console.log("ddd")}
            />
          </S.SubmitButtonContainer>
          <S.SubmitButtonContainer>
            <CommonButton
              contents="i로젠 전송"
              onClickFn={() => console.log("ddd")}
            />
          </S.SubmitButtonContainer>
        </S.FilterContainer>
      )}
    </S.Container>
  );
}
