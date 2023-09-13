import styled from "styled-components";
import { colors } from "./palette";
import { font } from "./typography";
import { AiOutlineClose } from "react-icons/ai";

export const Container = styled.div`
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

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const TableTitleContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;

  align-items: center;
  justify-items: center;
  width: 95%;
  height: 40px;
  border: 1px solid ${colors.black[400]};
  background-color: ${colors.black[800]};
`;

export const TableTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  font-size: ${font.fontSize[200]};
  font-weight: 700;

  &:first-child {
    border-right: 1px solid ${colors.black[400]};
  }
`;

export const TableContentsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  gap: 10px;
`;

export const TableContentsContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;

  align-items: center;
  justify-items: center;
  width: 95%;
  height: 30px;
  border: 1px solid ${colors.black[400]};
`;

export const TableContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  font-size: ${font.fontSize[200]};

  &:first-child {
    border-right: 1px solid ${colors.black[400]};
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

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
