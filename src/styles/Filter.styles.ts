import styled from "styled-components";
import { font } from "./typography";
import { colors } from "./palette";
import { mediaQuery } from "./mediaQuery";
import { breakPoints } from "./breakPoints";
import { SiMicrosoftexcel } from "react-icons/si";

export const Container = styled.div<{ $isWorkPage: boolean }>`
  display: grid;
  grid-template-columns: 1.4fr 1fr 2fr;
  align-items: center;
  width: 98%;
  min-width: calc(${breakPoints.medium}px - 230px);
  height: 65px;
  margin-left: 1%;
  position: sticky;
  top: 70px;
  background-color: ${colors.black[1000]};

  ${(props) =>
    props.$isWorkPage
      ? mediaQuery.large(`
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto;
      height: 80px;

      .item1 { grid-column: span 1; }
      .item2 { grid-column: span 1; }
      .item3 { grid-column: span 2; }
          
        `)
      : mediaQuery.large(`
          grid-template-columns: 1.3fr 1fr;
  `)}
`;

export const FilterContainer = styled.div<{ $isLogen: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  font-size: ${font.fontSize[200]};
  /* border: 1px solid red; */

  ${mediaQuery.large(`
    gap: 10px;
    font-size: ${font.fontSize[300]};
    justify-content: center;
  `)}

  ${mediaQuery.largeMedium(`
      padding-left: 2%;
      width: 98%;
  `)} 
  
  &.register {
    justify-content: ${(props) =>
      props.$isLogen ? "space-around" : "flex-start"};
    gap: 0;

    ${mediaQuery.large(`
        justify-content: center;
        gap: 50px;
    `)}
  }
`;

export const RegisterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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
  cursor: pointer;

  > .toggle-container {
    width: 55px;
    height: 27px;
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

    top: 1px;
    left: 1px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${colors.black[1000]};
    box-shadow: 0px 2px 4px rgba(29, 31, 33, 0.2);
    transition: 0.3s;
  }
  > .toggle--checked {
    left: 33px;
    transition: 0.3s;
  }
`;

export const ToggleLabel = styled.div`
  margin-right: 10px;
  font-size: ${font.fontSize[300]};
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
`;

export const SelectBox = styled.select`
  width: 90px;
  height: 30px;
  border-radius: 5px;
`;

export const Input = styled.input`
  width: 130px;
  height: 27px;
  border-radius: 5px;
  border-width: 1px;

  &.date {
    width: 100px;
  }
`;

export const LoadingContainer = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  width: 1500px;
  height: 900px;
`;

export const ExcelIcon = styled(SiMicrosoftexcel)`
  width: 20px;
  height: 20px;
  color: #010163;
  cursor: pointer;
`;
