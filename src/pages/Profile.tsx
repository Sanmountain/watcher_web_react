import { useRecoilValue } from "recoil";
import CommonButton from "../components/common/CommonButton";
import * as S from "../styles/Profile.styles";
import { loginState } from "../stores/loginState";
import { ChangeEvent, useState } from "react";

export default function Profile() {
  const login = useRecoilValue(loginState);
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState("");

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmedPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmed(e.target.value);
  };

  return (
    <S.Container>
      <S.ChangeContainer>
        <S.Title>비밀번호 변경</S.Title>
        <S.LabelInputContainer>
          <S.Label>지점명</S.Label>
          <S.Input
            value={`${login.branchName} (${login.branchCode})`}
            readOnly
            className="branch"
          />
        </S.LabelInputContainer>
        <S.LabelInputContainer>
          <S.Label>비밀번호</S.Label>
          <S.Input type="password" onChange={handlePassword} />
        </S.LabelInputContainer>
        <S.LabelInputContainer className="confirm">
          <S.Label>비밀번호 확인</S.Label>
          <S.Input type="password" onChange={handleConfirmedPassword} />
        </S.LabelInputContainer>
        {password !== confirmed && confirmed !== "" && (
          <S.PasswordError>비밀번호가 일치하지 않습니다.</S.PasswordError>
        )}
        <S.ButtonContainer>
          <CommonButton
            contents="변경하기"
            onClickFn={() => console.log("ddd")}
            width="20%"
            height="45px"
          />
        </S.ButtonContainer>
      </S.ChangeContainer>
    </S.Container>
  );
}
