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

  width: 100%;
  font-size: ${font.fontSize[100]};
  font-weight: 700;
  background-color: transparent;
  border: none;
  cursor: pointer;
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
