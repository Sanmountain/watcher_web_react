import styled from "styled-components";
import { colors } from "../palette";
import { font } from "../typography";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 230px;
  height: 97vh;
  background-color: ${colors.black[1000]};
  box-shadow: 4px 0 3px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 10px;
`;

export const LogoContainer = styled.div`
  width: 100%;
  height: 70px;
  margin-top: 30px;
  cursor: pointer;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 300px;
  gap: 40px;
`;

export const MenuTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${colors.black[100]};
  color: ${colors.black[1000]};
  font-size: ${font.fontSize[100]};
  font-weight: 700;
  width: 100%;
  height: 35px;
  margin-bottom: 20px;
`;

export const MenuButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content;
  font-size: ${font.fontSize[100]};
  font-weight: 700;
  background-color: transparent;
  border: none;
  position: relative;
  cursor: pointer;

  &.current {
    &::before {
      width: 100%; // 항상 보이게 설정
      transition: none; // 트랜지션 효과를 제거
    }
  }

  &::before {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: ${colors.blue[200]};
    transition: width 0.3s ease;
  }

  // .current 클래스가 없을 때만 hover 효과 적용
  &:not(.current):hover::before {
    width: 100%;
  }
`;

export const ShoppingMallContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  gap: 30px;
`;

export const ShoppingMallLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 65%;
  height: fit-content;
  gap: 5px;
  cursor: pointer;
`;

export const ShoppingMallImage = styled.img`
  width: 100%;
  height: 60%;
`;

export const ShoppingMallButton = styled.div`
  font-size: ${font.fontSize[200]};
  font-weight: 700;
  color: ${colors.blue[200]};
`;

export const ProductImageContainer = styled.div`
  width: 80%;
  height: 270px;
  border-radius: 10px;
  overflow: hidden;
`;

export const InvoiceButtonContainer = styled.div`
  width: 90%;
  height: 40px;
  margin-bottom: -15px;
`;

export const InvoiceInput = styled.input`
  width: 90%;
  height: 30px;
  border: 1px solid ${colors.black[300]};
  border-radius: 10px;
  text-align: center;
`;

export const InvoiceInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 90%;
  height: 60px;
  gap: 5px;
  font-size: ${font.fontSize[200]};
  font-weight: 700;
`;

export const InvoiceInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  border: 1px solid ${colors.black[300]};
  border-radius: 10px;
  font-size: ${font.fontSize[300]};
  font-weight: normal;

  &.prev {
    color: ${colors.black[300]};
  }
`;

export const TradeSubInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 90%;
  height: 70px;
  color: red;
  font-size: ${font.fontSize[200]};
  font-weight: 700;
  gap: 15px;
`;
