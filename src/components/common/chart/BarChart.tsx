import { ResponsiveBar } from "@nivo/bar";
import { colors } from "../../../styles/palette";
import { useEffect, useState } from "react";
import { getWeekChart } from "../../../api/dashboard/getWeekChart";
import { IWeekChartData } from "../../../types/weekChart.types";
import Loading from "../Loading";
import * as S from "../../../styles/Dashboard.styles";

export default function BarChart() {
  const [weekData, setWeekData] = useState<IWeekChartData[]>([]);

  const { mutate: weekChartMutate, isLoading: isWeekChartLoading } =
    getWeekChart(setWeekData);

  useEffect(() => {
    weekChartMutate();
  }, []);

  const revertWeekDataCountNumber = weekData?.map((item) => ({
    week: item.week,
    count: parseInt(item.count, 10),
  }));

  return (
    <>
      <ResponsiveBar
        data={revertWeekDataCountNumber}
        keys={["count"]}
        indexBy="week"
        margin={{ top: 20, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={[`${colors.green[100]}`]}
        fill={[
          {
            match: {
              id: "count",
            },
            id: "dots",
          },
        ]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="white"
      />
      {isWeekChartLoading && (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      )}
    </>
  );
}
