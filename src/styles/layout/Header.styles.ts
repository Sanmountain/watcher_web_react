import styled from "styled-components";
import { font } from "../typography";
import { colors } from "../palette";
import { mediaQuery } from "../mediaQuery";
import { breakPoints } from "../breakPoints";

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  min-width: calc(${breakPoints.medium}px - 210px);
  height: 70px;
  top: 0;
  position: sticky;
  background-color: ${colors.black[1000]};
  z-index: 2;
`;

export const ProfileButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 20%;
  height: 100%;
  padding: 0 25px;
  gap: 25px;
`;

export const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${font.fontSize[200]};
  font-weight: 600;
  width: fit-content;
  height: 100%;

  ${mediaQuery.largeMedium(`
    font-size: ${font.fontSize[300]}
  `)}
`;

export const LogOutButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: ${font.fontSize[100]};
  font-weight: 800;
  cursor: pointer;
`;
