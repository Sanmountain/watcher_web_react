import { useRecoilValue } from "recoil";
import CommonButton from "../components/common/CommonButton";
import * as S from "../styles/Profile.styles";
import { loginState } from "../stores/loginState";
import { ChangeEvent, useState } from "react";
import { editPassword } from "../api/editPassword";
import Swal from "sweetalert2";

export default function Profile() {
  const login = useRecoilValue(loginState);
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState("");

  const { mutate: changePassword } = editPassword(password);

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmedPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmed(e.target.value);
  };

  const handleChangePassword = () => {
    if (password !== confirmed) {
      Swal.fire({
        icon: "warning",
        title: "비밀번호를 확인해주세요",
        confirmButtonText: "확인",
      });

      return;
    }

    Swal.fire({
      title: "비밀번호를 변경하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "변경",
      cancelButtonText: "취소",
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        changePassword();
      }
    });
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
          <S.LabelInputContainer>
            <S.Label />
            <S.PasswordError>비밀번호가 일치하지 않습니다.</S.PasswordError>
          </S.LabelInputContainer>
        )}
        <S.ButtonContainer>
          <CommonButton
            contents="변경하기"
            onClickFn={handleChangePassword}
            width="20%"
            height="45px"
          />
        </S.ButtonContainer>
      </S.ChangeContainer>
    </S.Container>
  );
}
