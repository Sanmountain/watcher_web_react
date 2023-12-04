import * as S from "../../styles/layout/Sidebar.styles";
import VassIcon from "../../assets/images/sidebar/icon_vass.png";
import shoppingMallIcon from "../../assets/images/sidebar/icon_shoppingMall.png";
import S4Image from "../../assets/images/sidebar/img_S4.png";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { menuState } from "../../stores/menuState";
import { setVH } from "../../utils/setVH";
import { getMenuList } from "../../utils/getMenuList";
import { getVassPage } from "../../utils/getLocationPath";

export default function Sidebar() {
  const [currentMenu, setCurrentMenu] = useRecoilState(menuState);
  const login = useRecoilValue(loginState);

  const location = useLocation();
  const navigate = useNavigate();

  const VASS_PAGE = getVassPage(location);

  const menuList = getMenuList(login);

  // NOTE 실제 viewport값 가져오기
  useEffect(() => {
    window.addEventListener("resize", setVH);
    setVH();
  }, []);

  // NOTE Vass detail 페이지를 제외하고 현재 활성화 돼있는 메뉴 담기 (새로고침 시 초기화 때문에)
  useEffect(() => {
    if (!VASS_PAGE) {
      setCurrentMenu(location.pathname);
    }
  }, [location]);

  const onClickLogo = () => {
    navigate("/");
  };

  const onClickMenu = (path: string) => {
    navigate(path);
    setCurrentMenu(path);
  };

  return (
    <S.Container $isDetailPage={VASS_PAGE}>
      {!VASS_PAGE && (
        <S.Wrapper>
          <S.LogoContainer onClick={onClickLogo}>
            <S.Image src={VassIcon} />
          </S.LogoContainer>
          <S.MenuContainer>
            <S.MenuTitle>MENU</S.MenuTitle>
            {menuList?.map((menu) => (
              <S.MenuButton
                key={menu.label}
                onClick={() => onClickMenu(menu.path)}
                className={menu.path === currentMenu ? "current" : ""}
              >
                {menu.label}
              </S.MenuButton>
            ))}
          </S.MenuContainer>

          <S.ShoppingMallContainer>
            <S.ShoppingMallLogoContainer>
              <a
                href="http://jhc0213.godomall.com/main/index.php"
                target="_blank"
                rel="noopener noreferrer"
              >
                <S.ShoppingMallImage src={shoppingMallIcon} />
                <S.ShoppingMallButton>
                  쇼핑몰 바로가기 &gt;
                </S.ShoppingMallButton>
              </a>
            </S.ShoppingMallLogoContainer>

            <S.ProductImageContainer>
              <S.Image src={S4Image} />
            </S.ProductImageContainer>
          </S.ShoppingMallContainer>
        </S.Wrapper>
      )}
    </S.Container>
  );
}
