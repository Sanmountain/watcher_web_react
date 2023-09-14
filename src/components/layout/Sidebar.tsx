import * as S from "../../styles/layout/Sidebar.styles";
import VassIcon from "../../assets/images/sidebar/icon_vass.png";
import shoppingMallIcon from "../../assets/images/sidebar/icon_shoppingMall.png";
import S4Image from "../../assets/images/sidebar/img_S4.png";
import { useLocation, useNavigate, useParams } from "react-router";
import CommonButton from "../common/CommonButton";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { vassDeliveryState } from "../../stores/vass/vassDeliveryState";
import { prevVassDetailState } from "../../stores/vass/prevVassDetailState";
import { nowVassDetailState } from "../../stores/vass/nowVassDetailState";

export default function Sidebar() {
  const menuList = [
    { label: "대시보드", path: "/" },
    { label: "송장조회", path: "/work" },
    { label: "VASS", path: "/vass" },
  ];

  const [currentMenu, setCurrentMenu] = useState("");
  const vassDelivery = useRecoilValue(vassDeliveryState);
  const [nowVassDetail] = useRecoilState(nowVassDetailState);
  const [prevVassDetail] = useRecoilState(prevVassDetailState);

  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // NOTE vassDelivery에서 배송담당자 이름 가져오기
  const extractDeliveryManName = (description: string) => {
    const keyword = "배송담당: ";
    const startIndex = description.indexOf(keyword);

    if (startIndex === -1) return null; // 키워드가 없을 경우 null 반환

    const subStr = description.substring(startIndex + keyword.length).trim(); // 키워드 뒤의 문자열을 가져온 후 앞뒤 공백 제거
    const endIndex = subStr.indexOf(" "); // 뒤에 오는 첫 번째 공백의 위치

    if (endIndex === -1) return subStr; // 뒤에 공백이 없을 경우 남은 문자열 반환

    return subStr.substring(0, endIndex);
  };

  const deliveryManName = extractDeliveryManName(
    vassDelivery?.progresses[vassDelivery?.progresses.length - 1].description,
  );

  const deliveryState = vassDelivery?.state.text;

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
    navigate(path);
    setCurrentMenu(path);
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
            <S.InvoiceInfo>{nowVassDetail.barcode}</S.InvoiceInfo>
          </S.InvoiceInfoContainer>

          <S.InvoiceInfoContainer>
            <p>이전 송장번호</p>
            <S.InvoiceInfo className="prev">
              {prevVassDetail.barcode}
            </S.InvoiceInfo>
          </S.InvoiceInfoContainer>

          <S.TradeSubInfoContainer>
            <p>담당직원 :{deliveryManName}</p>
            <p>{deliveryState}</p>
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
