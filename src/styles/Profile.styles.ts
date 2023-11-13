import styled from "styled-components";
import { font } from "./typography";
import { colors } from "./palette";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: ${font.fontSize[700]};
  font-weight: 700;
  margin-top: 180px;
  margin-bottom: 70px;
`;

export const LabelInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  gap: 30px;
  margin-bottom: 70px;

  &.first {
    margin-bottom: 30px;
  }
`;

export const Label = styled.label`
  font-size: ${font.fontSize[600]};
  font-weight: 500;
  width: 20%;
  text-align: right;
`;

export const Input = styled.input`
  width: 50%;
  height: 30px;
  border: 1px solid ${colors.blue[300]};
`;
