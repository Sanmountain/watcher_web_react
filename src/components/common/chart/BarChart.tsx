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

  const revertWeekDataCountNumber = weekData?.map((item) => {
    let countIn = 0;
    let countOut = 0;

    if (Array.isArray(item.count)) {
      countIn = parseInt(item.count[0], 10);
      if (item.count.length > 1) {
        countOut = parseInt(item.count[1], 10);
      }
    } else {
      countIn = parseInt(item.count, 10);
    }

    return {
      scandate: item.scandate,
      week: item.week,
      countIn: countIn,
      countOut: countOut,
    };
  });

  return (
    <>
      <ResponsiveBar
        data={revertWeekDataCountNumber}
        keys={["countIn", "countOut"]}
        indexBy="week"
        margin={{ top: 20, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={[`${colors.green[100]}`, `${colors.blue[100]}`]}
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
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
      {isWeekChartLoading && (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      )}
    </>
  );
}
