import styled from "styled-components";
import { colors } from "./palette";
import { font } from "./typography";
import { AiOutlineClose } from "react-icons/ai";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  z-index: 3;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: ${colors.black[1000]};
  border: 1px solid ${colors.black[200]};
  border-radius: 10px;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: calc(100% - 20px);
  height: 40px;
  padding: 10px;
  border-bottom: 1px solid ${colors.black[400]};
  font-size: ${font.fontSize[100]};
  margin-bottom: 15px;
`;

export const CloseIcon = styled(AiOutlineClose)`
  color: ${colors.black[300]};
  font-size: 2rem;
  cursor: pointer;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
`;

export const LeftRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50%;
  height: 220px;
  gap: 15px;
`;

export const TitleInputContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  gap: 10px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
  font-size: ${font.fontSize[200]};
  font-weight: 700;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 60%;
  height: 35px;
  background-color: ${colors.black[600]};
  border: 1px solid ${colors.black[400]};
  border-radius: 10px;
  font-size: ${font.fontSize[200]};
  text-align: center;
`;

export const InfoInput = styled.input`
  width: 58%;
  height: 35px;
  background-color: ${colors.black[1000]};
  border: 1px solid ${colors.black[400]};
  border-radius: 10px;
  font-size: ${font.fontSize[200]};
  text-align: center;
`;

export const InfoSelectBox = styled.select`
  width: 60%;
  height: 35px;
  background-color: ${colors.black[1000]};
  border: 1px solid ${colors.black[400]};
  border-radius: 10px;
  font-size: ${font.fontSize[200]};
  text-align: center;
`;

export const TextAreaInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 95%;
  gap: 10px;
  margin-bottom: 10px;
`;

export const TextAreaInfo = styled.div`
  font-size: ${font.fontSize[200]};
  color: ${colors.black[200]};
  width: 100%;
`;

export const TextArea = styled.textarea`
  width: calc(95% - 20px);
  height: 400px;
  padding: 10px;
  border-radius: 10px;
  resize: none;
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: calc(100% - 20px);
  height: 40px;
  padding: 10px;
  border-top: 1px solid ${colors.black[400]};
  font-size: ${font.fontSize[100]};
  margin-top: 30px;
`;

export const ButtonContainer = styled.div`
  width: fit-content;
  height: fit-content;
`;
