import { useRecoilState, useResetRecoilState } from "recoil";
import * as S from "../../styles/layout/Header.styles";
import { loginState } from "../../stores/loginState";
import { useNavigate } from "react-router";

export default function Header() {
  const [login, setLogin] = useRecoilState(loginState);
  const resetLogin = useResetRecoilState(loginState);

  const navigate = useNavigate();

  const onClickLogout = () => {
    if (login.isUserIdStored) {
      setLogin({ ...login, isLogin: false, branchName: "", localIP: "" });
    } else if (!login.isUserIdStored) {
      resetLogin();
    }

    navigate("/login");
  };

  return (
    <S.Container>
      <S.ProfileButtonContainer>
        <S.Profile>{login.branchName}</S.Profile>
        <S.LogOutButton onClick={onClickLogout}>Logout</S.LogOutButton>
      </S.ProfileButtonContainer>
    </S.Container>
  );
}
