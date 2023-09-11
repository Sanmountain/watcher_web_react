import styled from "styled-components";
import { font } from "../typography";

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 70px;
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
`;

export const LogOutButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: ${font.fontSize[100]};
  font-weight: 800;
  cursor: pointer;
`;
