import styled from "styled-components";
import { font } from "../typography";
import { colors } from "../palette";
import { mediaQuery } from "../mediaQuery";
import { breakPoints } from "../breakPoints";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: calc(${breakPoints.medium}px - 210px);
  height: 70px;
  top: 0;
  position: sticky;
  background-color: ${colors.black[1000]};
  z-index: 2;
`;

export const LogoContainer = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
`;

export const LogoImg = styled.img`
  width: 230px;
  height: 53px;
  margin-bottom: 10px;
`;

export const MenuContainer = styled.div`
  flex: 5;

  display: flex;
  flex-direction: row;

  justify-content: flex-start;
  align-items: center;
  gap: 3%;
`;

export const HeaderImg = styled.img`
  width: 100px;
  height: 30px;
`;

export const MenuButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content;
  font-size: ${font.fontSize[600]};
  font-weight: 900;
  background-color: transparent;
  border: none;
  position: relative;
  cursor: pointer;

  &.current {
    &::before {
      width: 100%; // 항상 보이게 설정
      transition: none; // 트랜지션 효과를 제거
    }
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 13px;
    left: 50%;
    top: 150%;
    transform: translateX(-50%);
    width: 0;
    height: 3px;
    background-color: ${colors.blue[200]};
    transition: width 0.3s ease;
  }

  // .current 클래스가 없을 때만 hover 효과 적용
  &:not(.current):hover::before {
    width: 100%;
  }
`;

export const ProfileButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  width: 20%;
  height: 100%;
  gap: 10px;
`;

export const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${font.fontSize[400]};
  font-weight: 400;
  width: fit-content;
  height: 100%;

  ${mediaQuery.largeMedium(`
    font-size: ${font.fontSize[300]}
  `)}
`;

export const LogOutButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: ${font.fontSize[600]};
  font-weight: 600;
  cursor: pointer;
`;
