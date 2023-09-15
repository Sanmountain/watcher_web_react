import { ResponsiveLine } from "@nivo/line";
import { colors } from "../../../styles/palette";
import { useEffect, useState } from "react";
import { IWeekChartData } from "../../../types/weekChart.types";
import { getMonthChart } from "../../../api/dashboard/getMonthChart";
import * as S from "../../../styles/Dashboard.styles";
import Loading from "../Loading";

export default function LineChart() {
  const [monthData, setMonthData] = useState<IWeekChartData[]>([]);

  const { mutate: monthChartMutate, isLoading: isMonthChartLoading } =
    getMonthChart(setMonthData);

  useEffect(() => {
    monthChartMutate();
  }, []);

  const revertMonthDataCountNumber = monthData?.map((item) => ({
    scandate: item.scandate,
    count: parseInt(item.count, 10),
  }));

  const lineChartData = [
    {
      id: "count",
      data: revertMonthDataCountNumber.map((item) => ({
        x: item.scandate,
        y: item.count,
      })),
    },
  ];

  return (
    <>
      <ResponsiveLine
        data={lineChartData}
        margin={{ top: 30, right: 60, bottom: 50, left: 110 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        colors={[`${colors.green[100]}`]}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
      />
      {isMonthChartLoading && (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      )}
    </>
  );
}
