import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import * as S from "../../styles/layout/Header.styles";
import { loginState } from "../../stores/loginState";
import { useNavigate, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { vassListState } from "../../stores/vass/vassListState";
import { nowVassDetailState } from "../../stores/vass/nowVassDetailState";
import { prevVassDetailState } from "../../stores/vass/prevVassDetailState";
import JHCLogo from "../../assets/images/JHC.png";
import gigaLogo from "../../assets/images/gigaeyes.png";
import { menuState } from "../../stores/menuState";
import { workListState } from "../../stores/work/workListState";
import { workFilterState } from "../../stores/work/workFilterState";
import { vassFilterState } from "../../stores/vass/vassFilterState";

export default function Header() {
  const [login, setLogin] = useRecoilState(loginState);
  const resetLogin = useResetRecoilState(loginState);
  const resetWorkFilter = useResetRecoilState(workFilterState);
  const resetVassFilter = useResetRecoilState(vassFilterState);
  const resetWorkList = useResetRecoilState(workListState);
  const resetVassList = useResetRecoilState(vassListState);
  const resetNowVassDetail = useResetRecoilState(nowVassDetailState);
  const resetPrevVassDetail = useResetRecoilState(prevVassDetailState);
  const [currentMenu, setCurrentMenu] = useRecoilState(menuState);

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const onClickLogout = () => {
    if (login.isUserIdStored) {
      setLogin({ ...login, isLogin: false, branchName: "", localIP: "" });
    } else {
      resetLogin();
    }

    resetWorkFilter();
    resetVassFilter();
    resetWorkList();
    resetVassList();
    resetNowVassDetail();
    resetPrevVassDetail();
    navigate("/login");
  };

  const menuList = [
    { label: "대시보드", path: "/" },
    { label: "송장조회", path: "/work" },
    { label: "화물추적", path: "/vass" },
  ];

  // NOTE Vass detail 페이지를 제외하고 현재 활성화 돼있는 메뉴 담기 (새로고침 시 초기화 때문에)
  useEffect(() => {
    if (!params.invoiceNumber) {
      setCurrentMenu(location.pathname);
    }
  }, [params, location]);

  const onClickLogo = () => {
    navigate("/");
  };

  const onClickMenu = (path: string) => {
    if (login.camUsable === "2") {
      navigate(path);
      setCurrentMenu(path);
    } else {
      if (path === "/vass") {
        navigate("/noCam");
      } else {
        navigate(path);
      }
    }
  };

  const onClickProfile = () => {
    navigate("/profile");
  };

  return (
    <S.Container>
      <S.LogoContainer>
        <S.LogoImg src={JHCLogo} onClick={onClickLogo} />
      </S.LogoContainer>
      <S.MenuContainer>
        {menuList.map((menu) => (
          <S.MenuButton
            key={menu.label}
            onClick={() => onClickMenu(menu.path)}
            className={menu.path === currentMenu ? "current" : ""}
          >
            {menu.label}
          </S.MenuButton>
        ))}
        {login.company === "LOGEN" && (
          <Link to="https://gigaeyes.co.kr/memberN/loginForm">
            <S.HeaderImg src={gigaLogo} />
          </Link>
        )}
      </S.MenuContainer>
      <S.ProfileButtonContainer>
        <S.Profile onClick={onClickProfile}>{login.branchName}</S.Profile>
        <S.LogOutButton onClick={onClickLogout}>Logout</S.LogOutButton>
      </S.ProfileButtonContainer>
    </S.Container>
  );
}
