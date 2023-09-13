import * as S from "../../styles/layout/Sidebar.styles";
import VassIcon from "../../assets/images/sidebar/icon_vass.png";
import shoppingMallIcon from "../../assets/images/sidebar/icon_shoppingMall.png";
import S4Image from "../../assets/images/sidebar/img_S4.png";
import { useNavigate, useParams } from "react-router";
import CommonButton from "../common/CommonButton";

export default function Sidebar() {
  const menuList = [
    { label: "대시보드", path: "/" },
    { label: "송장조회", path: "/work" },
    { label: "VASS", path: "/vass" },
  ];

  const navigate = useNavigate();
  const params = useParams();

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

      {params.invoiceNumber ? (
        <S.ShoppingMallContainer>
          <S.InvoiceButtonContainer>
            <CommonButton
              contents="송장번호 조회"
              onClickFn={() => console.log("ddd")}
            />
          </S.InvoiceButtonContainer>
          <S.InvoiceInput placeholder="송장번호를 입력해주세요" />

          <S.InvoiceInfoContainer>
            <p>현재 송장번호</p>
            <S.InvoiceInfo>36336157723</S.InvoiceInfo>
          </S.InvoiceInfoContainer>

          <S.InvoiceInfoContainer>
            <p>이전 송장번호</p>
            <S.InvoiceInfo className="prev">36336157723</S.InvoiceInfo>
          </S.InvoiceInfoContainer>

          <S.TradeSubInfoContainer>
            <p>담당직원 : 홍길동</p>
            <p>배송출발</p>
          </S.TradeSubInfoContainer>
        </S.ShoppingMallContainer>
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
