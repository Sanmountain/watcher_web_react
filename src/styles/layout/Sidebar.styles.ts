import styled from "styled-components";
import { colors } from "../palette";
import { font } from "../typography";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 14%;
  height: 88vh;
  background-color: ${colors.black[1000]};
  box-shadow: 4px 0 3px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 10px;
  margin-top: 5px;
  left: 0;
  z-index: 1;
`;

export const LogoContainer = styled.div`
  width: 70%;
  height: 70px;
  margin-top: 40px;
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
  height: 250px;
  gap: 20px;

  border-bottom: 1px solid black;
`;

export const MenuTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${colors.black[100]};
  color: ${colors.black[1000]};
  font-size: ${font.fontSize[700]};
  font-weight: 700;
  width: 100%;
  height: 35px;
  margin-bottom: 20px;
`;

export const MenuButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${font.fontSize[200]};
  font-weight: 600;
  background-color: white;
  border: none;

  cursor: pointer;

  &::before {
    content: "•";
    padding-right: 8px;
  }

  &:hover {
    width: 100%;

    background-color: ${colors.black[100]};
    transition: 0.5s;
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

  width: 63%;
  height: fit-content;

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
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
`;

export const MarginContainer = styled.div`
  height: 300px;
`;
