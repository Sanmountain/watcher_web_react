import styled from "styled-components";
import { colors } from "./palette";
import { font } from "./typography";

export const DeliveryStateContainer = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
`;

export const DeliveryStateText = styled.div`
  font-size: ${font.fontSize[200]};

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 15px;
`;

export const BarContainer = styled.div`
  position: relative;
  width: 80%;
  height: 5%;
  background-color: white;
  border-radius: 20px;
  margin: 0 auto;
`;

export const Dot = styled.div`
  position: absolute;
  top: -4px;
  width: 15px;
  height: 15px;
  background-color: ${colors.black[1000]};
  border: 2px solid ${colors.blue[300]};
  border-radius: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Progress = styled.div`
  position: absolute;
  height: 100%;
  background-color: ${colors.blue[300]};
  border: 1px solid ${colors.blue[300]};
  border-radius: 20px;
`;

export const DeliveryIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
  svg {
    width: 30%;
    height: 30%;
    color: ${colors.blue[300]};
  }
`;

export const DeliveryText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  color: ${colors.blue[200]};
  font-size: ${font.fontSize[600]};
`;
