import styled from "styled-components";
import { font } from "./typography";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr 1.1fr;
  align-items: center;
  width: 99.4%;
  height: 65px;
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  gap: 20px;
  font-size: ${font.fontSize[200]};
`;

export const FilterTitle = styled.div`
  font-size: ${font.fontSize[100]};
  font-weight: 700;
`;

export const SelectBox = styled.select`
  min-width: 120px;
  height: 30px;
`;

export const Input = styled.input`
  min-width: 120px;
  height: 27px;
`;

export const ButtonContainer = styled.div`
  width: 75px;
  height: 30px;
`;

export const SubmitButtonContainer = styled.div`
  width: 110px;
  height: 30px;
`;
