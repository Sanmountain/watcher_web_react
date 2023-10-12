import styled from "styled-components";
import { font } from "./typography";
import { colors } from "./palette";
import { mediaQuery } from "./mediaQuery";
import { breakPoints } from "./breakPoints";

export const Container = styled.div<{ $isWorkPage: boolean }>`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.4fr;
  align-items: center;
  width: 98%;
  min-width: calc(${breakPoints.medium}px - 230px);
  height: 65px;
  margin-left: 1%;
  padding-left: 0.5%;
  position: sticky;
  top: 70px;
  background-color: ${colors.black[1000]};

  ${mediaQuery.large(`
    grid-template-columns: 1.5fr 1.1fr 0.8fr;
    padding-left: 0;
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
  gap: 10px;
  font-size: ${font.fontSize[200]};

  ${mediaQuery.large(`
    gap: 10px;
    font-size: ${font.fontSize[300]};
  `)}

  ${mediaQuery.largeMedium(`
      padding-left: 2%;
      width: 98%;
  `)}

  &.noDisplay {
    display: none;

    ${mediaQuery.largeMedium(`
      display: flex; 
  `)}
  }

  &.register {
    width: 110%;
    justify-content: left;

    ${mediaQuery.largeMedium(`
      justify-content: center;
  `)}
  }
`;

export const AutoTitle = styled.span`
  width: 13%;
  margin-left: 2%;

  height: 28px;
  text-align: center;
  padding-top: 2px;
  background-color: #dadada;
  border: 1px solid #dadada;
  border-radius: 5px;
`;

export const ToggleContainer = styled.div`
  position: relative;

  > .toggle-container {
    width: 63px;
    height: 28px;
    border-radius: 16px;
    background-color: ${colors.black[600]};
  }
  > .toggle--checked {
    background-color: ${colors.blue[200]};
    transition: 0.3s;
  }

  > .toggle-circle {
    position: absolute;
    margin-top: 2px;

    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${colors.black[1000]};
    box-shadow: 0px 2px 4px rgba(29, 31, 33, 0.2);
    transition: 0.3s;
  }
  > .toggle--checked {
    left: 34px;
    transition: 0.3s;
  }
`;

export const FilterTitle = styled.div`
  font-size: ${font.fontSize[300]};
  font-weight: 400;

  width: 80px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  background-color: ${colors.black[1100]};

  ${mediaQuery.large(`
    font-size: ${font.fontSize[200]};
  `)}

  &.autoBtn {
    margin-left: 30px;
  }
`;

export const SelectBox = styled.select`
  min-width: 110px;
  height: 30px;
  border-radius: 5px;
`;

export const Input = styled.input`
  min-width: 110px;
  height: 27px;
  border-radius: 5px;
  border-width: 1px;
`;

export const ButtonContainer = styled.div`
  width: 75px;
  height: 30px;
`;

export const SubmitButtonContainer = styled.div`
  width: 140px;
  height: 30px;
`;

export const LoadingContainer = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  width: 1500px;
  height: 900px;
`;
