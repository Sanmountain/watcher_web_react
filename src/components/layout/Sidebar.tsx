import * as S from "../../styles/layout/Sidebar.styles";
import VassIcon from "../../assets/images/sidebar/icon_vass.png";
import shoppingMallIcon from "../../assets/images/sidebar/icon_shoppingMall.png";
import S4Image from "../../assets/images/sidebar/img_S4.png";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";

export default function Sidebar() {
  const menuList = [
    { label: "대시보드", path: "/" },
    { label: "송장조회", path: "/work" },
    { label: "화물추적", path: "/vass" },
  ];

  const [currentMenu, setCurrentMenu] = useState("");
  const login = useRecoilValue(loginState);

  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // NOTE Vass detail 페이지를 제외하고 현재 활성화 돼있는 메뉴 담기 (새로고침 시 초기화 때문에)
  useEffect(() => {
    if (!params.invoiceNumber) {
      setCurrentMenu(`${location.pathname}`);
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

  return (
    <S.Container>
      <S.LogoContainer onClick={onClickLogo}>
        <S.Image src={VassIcon} />
      </S.LogoContainer>
      <S.MenuContainer>
        <S.MenuTitle>MENU</S.MenuTitle>
        {menuList.map((menu) => (
          <S.MenuButton
            key={menu.label}
            onClick={() => onClickMenu(menu.path)}
            className={menu.path === currentMenu ? "current" : ""}
          >
            {menu.label}
          </S.MenuButton>
        ))}
      </S.MenuContainer>

      {params.invoiceNumber ? (
        <S.MarginContainer></S.MarginContainer>
      ) : (
        <S.ShoppingMallContainer>
          <S.ShoppingMallLogoContainer>
            <a
              href="http://jhc0213.godomall.com/main/index.php"
              target="_blank"
              rel="noopener noreferrer"
            >
              <S.ShoppingMallImage src={shoppingMallIcon} />
              <S.ShoppingMallButton>쇼핑몰 바로가기 &gt;</S.ShoppingMallButton>
            </a>
          </S.ShoppingMallLogoContainer>

          <S.ProductImageContainer>
            <S.Image src={S4Image} />
          </S.ProductImageContainer>
        </S.ShoppingMallContainer>
      )}
    </S.Container>
  );
}
