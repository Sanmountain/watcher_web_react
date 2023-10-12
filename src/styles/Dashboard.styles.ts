import styled from "styled-components";
import { colors } from "./palette";
import { font } from "./typography";
import { breakPoints } from "./breakPoints";
import { mediaQuery } from "./mediaQuery";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: calc(${breakPoints.medium}px - 230px);
`;

export const TopContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.3fr 1.3fr;
  align-items: center;
  justify-items: center;

  width: 95%;
  height: 95px;
  border-bottom: 3px solid ${colors.black[300]};
  margin-bottom: 30px;
`;

export const Date = styled.div`
  font-size: 3.3rem;
  font-weight: 900;
`;

export const CountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  font-size: ${font.fontSize[100]};
  font-weight: 600;
  gap: 30px;

  ${mediaQuery.largeMedium(`
    gap: 20px;
  `)}
`;

export const Count = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: ${font.fontSize[200]};
  background-color: ${colors.blue[200]};
  color: ${colors.black[1000]};
  border-radius: 10px;
  min-width: 220px;
  width: 45%;
  height: 35px;
  padding: 5px 10px;

  ${mediaQuery.largeMedium(`
    width: 40%;
    min-width: 200px;
  `)}
`;

export const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;

  width: 100%;
`;

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 720px;
  gap: 20px;
`;

export const ChartTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: ${font.fontSize[100]};
  font-weight: 700;
  color: ${colors.black[300]};
  text-align: center;
  margin-top: 30px;
`;

export const ChartCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 2.8rem;
  font-weight: 700;
  color: ${colors.blue[200]};
  text-decoration: underline;
`;

export const Chart = styled.div`
  width: 100%;
  height: 75%;
  margin-top: 50px;
  position: relative;
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 40%;
  width: 100%;
`;
