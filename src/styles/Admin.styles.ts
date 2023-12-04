import styled from "styled-components";
import { colors } from "./palette";
import { font } from "./typography";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const AdminMenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 99%;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 0.5%;
`;

export const AdminMenu = styled.button`
  border: none;
  background-color: transparent;
  width: fit-content;
  padding: 10px 5px;
  font-size: ${font.fontSize[100]};
  cursor: pointer;

  &.current {
    color: ${colors.blue[500]};
    font-weight: 800;
    border-bottom: 3px solid ${colors.blue[500]};
  }
`;

export const TitleToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 78%;
  height: 82.5%;
  padding: 2% 10%;
  border: 1px solid ${colors.black[700]};
  border-radius: 20px;

  &.edit {
    width: 98%;
    height: 84%;
    padding: 2% 0 1% 0;
  }
`;

export const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 98%;
  height: 40px;
  margin-bottom: 10px;
`;

export const InputButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;

  &.edit {
    justify-content: center;
  }

  > div {
    font-size: ${font.fontSize[200]};
  }
`;

export const SelectBox = styled.select`
  width: 90px;
  height: 30px;
  border-radius: 5px;
`;

export const Input = styled.input`
  width: 170px;
  height: 27px;
  border-radius: 5px;
  border-width: 1px;

  &.date {
    width: 140px;
  }

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  -moz-appearance: textfield;
  appearance: none;
`;

export const TableTitleContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1.2fr 1.5fr;
  align-items: center;
  justify-content: center;
  background-color: ${colors.black[900]};
  border: 1px solid ${colors.black[500]};
  width: 98%;
  height: 40px;
  margin-bottom: 5px;
  border-radius: 5px;
  position: sticky;
  top: 135px;
  font-size: ${font.fontSize[200]};
  font-weight: 600;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 101%;
  height: 100%;
  gap: 10px;
  margin-left: 1%;
  overflow-y: scroll;
`;

export const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1.2fr 1.5fr;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.black[500]};
  width: 98%;
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

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 2.8rem;
  font-weight: 700;
  color: ${colors.blue[500]};
  margin-top: 30px;
  margin-bottom: 20%;
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: fit-content;
  gap: 20px;
  font-size: ${font.fontSize[200]};
  font-weight: 700;
`;
