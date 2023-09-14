import { styled } from "styled-components";
import { font } from "./typography";
import { colors } from "./palette";
import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";

export const Container = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px 0;
  gap: 10px;
`;

export const PaginationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 32px;
  height: 32px;
  padding: 8px;
  margin: 0;
  background-color: transparent;
  border: 1px solid ${colors.blue[200]};
  color: ${colors.blue[200]};
  font-size: ${font.fontSize[300]};
  border-radius: 4px;

  &:hover {
    background-color: ${colors.blue[200]};
    color: ${colors.black[1000]};
    cursor: pointer;
  }

  &[disabled] {
    color: ${colors.black[400]};
    background-color: transparent;
    border: 1px solid ${colors.black[400]};
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background-color: ${colors.blue[200]};
    color: ${colors.black[1000]};
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export const FirstIcon = styled(FiChevronsLeft)`
  font-size: ${font.fontSize[300]};
`;

export const PrevIcon = styled(FiChevronLeft)`
  font-size: ${font.fontSize[300]};
`;

export const NextIcon = styled(FiChevronRight)`
  font-size: ${font.fontSize[300]};
`;

export const LastIcon = styled(FiChevronsRight)`
  font-size: ${font.fontSize[300]};
`;
