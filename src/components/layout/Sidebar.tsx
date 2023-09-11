import * as S from "../../styles/layout/Sidebar.styles";
import VassIcon from "../../assets/images/sidebar/icon_vass.png";
import shoppingMallIcon from "../../assets/images/sidebar/icon_shoppingMall.png";
import S4Image from "../../assets/images/sidebar/img_S4.png";
import { useNavigate } from "react-router";

export default function Sidebar() {
  const menuList = [
    { label: "대시보드", path: "/" },
    { label: "송장조회", path: "/work" },
    { label: "VASS", path: "/vass" },
  ];
  const navigate = useNavigate();

  const onClickMenu = (path: string) => {
    navigate(path);
  };

  return (
    <S.Container>
      <S.LogoContainer>
        <S.Image src={VassIcon} />
      </S.LogoContainer>
      <S.MenuContainer>
        <S.MenuTitle>MENU</S.MenuTitle>
        {menuList.map((menu) => (
          <S.MenuButton key={menu.label} onClick={() => onClickMenu(menu.path)}>
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
            <S.ShoppingMallButton>쇼핑몰 바로가기 &gt;</S.ShoppingMallButton>
          </a>
        </S.ShoppingMallLogoContainer>

        <S.ProductImageContainer>
          <S.Image src={S4Image} />
        </S.ProductImageContainer>
      </S.ShoppingMallContainer>
    </S.Container>
  );
}
