import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { colors } from "./palette";

export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 370px;
  height: 220px;
  padding: 15px;
  background-color: ${colors.black[900]};
  border: 1px solid ${colors.black[700]};
  border-radius: 10px;
  z-index: 10;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const CloseIcon = styled(AiOutlineClose)`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 90%;
`;

export const SelectBox = styled.select`
  width: 50%;
  height: 40px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const Count = styled.div`
  font-size: 15px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
`;
