import { useRecoilState, useResetRecoilState } from "recoil";
import * as S from "../../styles/layout/Header.styles";
import { loginState } from "../../stores/loginState";
import { useNavigate } from "react-router";
import { vassListState } from "../../stores/vass/vassListState";
import { nowVassDetailState } from "../../stores/vass/nowVassDetailState";
import { prevVassDetailState } from "../../stores/vass/prevVassDetailState";

export default function Header() {
  const [login, setLogin] = useRecoilState(loginState);
  const resetLogin = useResetRecoilState(loginState);
  const resetVassList = useResetRecoilState(vassListState);
  const resetNowVassDetail = useResetRecoilState(nowVassDetailState);
  const resetPrevVassDetail = useResetRecoilState(prevVassDetailState);

  const navigate = useNavigate();

  const onClickLogout = () => {
    if (login.isUserIdStored) {
      setLogin({ ...login, isLogin: false, branchName: "", localIP: "" });
      resetVassList();
      resetNowVassDetail();
      resetPrevVassDetail();
    } else if (!login.isUserIdStored) {
      resetLogin();
      resetVassList();
      resetNowVassDetail();
      resetPrevVassDetail();
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
