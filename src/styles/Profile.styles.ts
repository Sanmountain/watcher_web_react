import styled from "styled-components";
import { font } from "./typography";
import { colors } from "./palette";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ChangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 60%;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 2.8rem;
  font-weight: 700;
  color: ${colors.blue[500]};
  margin-bottom: 50px;
`;

export const LabelInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 30px;
  margin-bottom: 30px;

  &.confirm {
    margin-bottom: 10px;
  }
`;

export const Label = styled.label`
  font-size: ${font.fontSize[600]};
  font-weight: 600;
  width: 25%;
  text-align: right;
`;

export const Input = styled.input`
  width: 50%;
  height: 30px;
  padding: 5px 10px;
  border: 1px solid ${colors.blue[300]};
  font-size: ${font.fontSize[200]};

  &:focus {
    outline: 1px solid ${colors.blue[300]};
  }

  &.branch {
    font-weight: 600;
  }
`;

export const PasswordError = styled.div`
  display: flex;
  width: 52%;
  font-size: ${font.fontSize[200]};
  color: red;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-top: 50px;
`;
