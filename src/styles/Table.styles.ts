import styled from "styled-components";
import { colors } from "./palette";
import { font } from "./typography";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 98%;
  padding: 0 1%;
`;

export const TitleContainer = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)`};
  align-items: center;
  justify-items: center;

  background-color: ${colors.black[900]};
  border: 1px solid ${colors.black[500]};
  width: 99.5%;
  height: 40px;
  margin-bottom: 5px;
  border-radius: 5px;
  position: sticky;
  top: 135px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  font-size: ${font.fontSize[200]};
  font-weight: 600;
`;

export const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 730px;
  gap: 10px;
  overflow-y: scroll;
`;

export const ContentsContainer = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)`};
  align-items: center;
  justify-items: center;

  border: 1px solid ${colors.black[500]};
  width: 99.5%;
  min-height: 40px;
  border-radius: 5px;
`;

export const Contents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  font-size: ${font.fontSize[200]};
`;

export const CommonButtonContainer = styled.div`
  width: fit-content;
  height: fit-content;
`;
