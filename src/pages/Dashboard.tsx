import BarChart from "../components/common/chart/BarChart";
import LineChart from "../components/common/chart/LineChart";
import * as S from "../styles/Dashboard.styles";

export default function Dashboard() {
  return (
    <S.Container>
      <S.TopContainer>
        <S.Date>2023-09-12</S.Date>
        <S.CountContainer>
          배송 입고
          <S.Count>
            <p>스캔 수량</p>
            <p>10756 건</p>
          </S.Count>
        </S.CountContainer>
        <S.CountContainer>
          집하 출고
          <S.Count>
            <p>스캔 수량</p>
            <p>0 건</p>
          </S.Count>
        </S.CountContainer>
      </S.TopContainer>
      <S.BottomContainer>
        <S.ChartContainer>
          <S.ChartTitle>최근 7일 스캔 수량</S.ChartTitle>
          <S.ChartCount>10756건</S.ChartCount>
          <S.Chart>
            <BarChart />
          </S.Chart>
        </S.ChartContainer>
        <S.ChartContainer>
          <S.ChartTitle>2023년 스캔 수량</S.ChartTitle>
          <S.ChartCount>10756건</S.ChartCount>
          <S.Chart>
            <LineChart />
          </S.Chart>
        </S.ChartContainer>
      </S.BottomContainer>
    </S.Container>
  );
}
