import styled from "styled-components";
import { colors } from "./palette";
import { font } from "./typography";
import { BiShow, BiHide } from "react-icons/bi";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 470px;
  width: 23%;
  height: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
`;

export const LogoContainer = styled.div`
  width: 70%;
  height: 120px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 65%;
  gap: 20px;
  margin-top: 40px;
  margin-bottom: 20px;
`;

export const PasswordContainer = styled.div`
  display: flex;
  align-items: center;

  width: calc(100% + 20px);
  height: 48px;
  position: relative;
`;

export const Input = styled.input`
  background-color: ${colors.black[600]};
  border: 1px solid ${colors.black[700]};
  border-radius: 20px;
  width: 100%;
  height: 48px;
  padding: 0 10px;
`;

export const ShowIcon = styled(BiShow)`
  font-size: ${font.fontSize[200]};
  color: ${colors.black[300]};
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const HiddenIcon = styled(BiHide)`
  font-size: ${font.fontSize[200]};
  color: ${colors.black[300]};
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const SaveContainer = styled.div`
  display: flex;
  align-items: center;

  width: 68%;
  height: 20px;
  gap: 3px;
  color: ${colors.black[300]};
  font-size: ${font.fontSize[300]};
`;

export const CheckBox = styled.input`
  width: 15px;
  height: 15px;
`;

export const LoginButtonContainer = styled.div`
  width: 70%;
  height: 48px;
  margin-top: 20px;
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 65%;
  height: 70px;
  padding: 10px;
  border-top: 1px solid ${colors.black[400]};
  font-size: ${font.fontSize[300]};
  margin-top: 40px;
`;

export const JHCIcon = styled.div`
  width: 17%;
  height: 40px;
`;
