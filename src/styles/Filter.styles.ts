import styled from "styled-components";
import { font } from "./typography";
import { colors } from "./palette";
import { mediaQuery } from "./mediaQuery";
import { breakPoints } from "./breakPoints";

export const Container = styled.div<{ $isWorkPage: boolean }>`
  display: grid;
  grid-template-columns: 1.3fr 1.1fr 1fr;
  align-items: center;
  width: 98%;
  min-width: calc(${breakPoints.medium}px - 230px);
  height: 65px;
  margin-left: 1%;
  position: sticky;
  top: 70px;
  background-color: ${colors.black[1000]};

  ${mediaQuery.large(`
    grid-template-columns: 1.5fr 1.1fr 0.8fr;
  `)}

  ${(props) =>
    props.$isWorkPage
      ? mediaQuery.largeMedium(`
          grid-template-columns: 1.3fr 1fr;
          grid-template-rows: 1fr 1fr;
          height: 110px;
        `)
      : mediaQuery.largeMedium(`
          grid-template-columns: 1.3fr 1fr;
  `)}
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;
  gap: 20px;
  font-size: ${font.fontSize[200]};

  ${mediaQuery.large(`
    gap: 10px;
  `)}

  ${mediaQuery.largeMedium(`
      justify-content: center; 
  `)}

  &.noDisplay {
    display: none;

    ${mediaQuery.largeMedium(`
      display: flex; 
  `)}
  }

  &.register {
    justify-content: center;

    ${mediaQuery.largeMedium(`
      justify-content: center;
  `)}
  }
`;

export const FilterTitle = styled.div`
  font-size: ${font.fontSize[100]};
  font-weight: 700;

  ${mediaQuery.large(`
    font-size: ${font.fontSize[200]};
  `)}

  margin-left: 2%;
`;

export const SelectBox = styled.select`
  min-width: 120px;
  height: 30px;
  border-radius: 5px;
`;

export const Input = styled.input`
  min-width: 140px;
  height: 27px;
  border-radius: 5px;
`;

export const ButtonContainer = styled.div`
  width: 75px;
  height: 30px;
`;

export const SubmitButtonContainer = styled.div`
  width: 110px;
  height: 30px;
`;

export const LoadingContainer = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  width: 1500px;
  height: 900px;
`;
