import { useState } from "react";
import * as S from "../../styles/Filter.styles";
import CommonButton from "./CommonButton";
import Toggle from "./Toggle";
import { useLocation } from "react-router";
import { getVassPage } from "../../utils/getLocationPath";

export default function Filter() {
  const [isOn, setIsOn] = useState(false);

  const location = useLocation();

  const VASS_PAGE = getVassPage(location);

  const onClickToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <S.Container>
      <S.FilterContainer>
        <S.FilterTitle>조회량</S.FilterTitle> 0 건{" "}
        <S.SelectBox>
          <option>배송입고</option>
          <option>집하출고</option>
        </S.SelectBox>
        <S.Input type="date" />
        <S.ButtonContainer>
          <CommonButton contents="검색" onClickFn={() => console.log("ddd")} />
        </S.ButtonContainer>
      </S.FilterContainer>

      <S.FilterContainer>
        <S.FilterTitle>송장조회</S.FilterTitle>
        <S.Input placeholder="송장번호 입력" />
        <S.ButtonContainer>
          <CommonButton contents="검색" onClickFn={() => console.log("ddd")} />
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
          <S.FilterTitle>{isOn ? "자동" : "수동"}</S.FilterTitle>
          <Toggle onClick={onClickToggle} $isOn={isOn} />
        </S.FilterContainer>
      )}
    </S.Container>
  );
}
