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

  const revertMonthDataCountNumber = monthData?.map((item) => {
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
      countIn: countIn,
      countOut: countOut,
    };
  });

  const lineChartData = [
    {
      id: "countIn",
      data: revertMonthDataCountNumber.map((item) => ({
        x: item.scandate,
        y: item.countIn,
      })),
    },
    {
      id: "countOut",
      data: revertMonthDataCountNumber.map((item) => ({
        x: item.scandate,
        y: item.countOut,
      })),
    },
  ];

  return (
    <>
      <ResponsiveLine
        data={lineChartData}
        margin={{ top: 30, right: 90, bottom: 50, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        colors={[`${colors.green[100]}`, `${colors.blue[100]}`]}
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
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
      {isMonthChartLoading && (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      )}
    </>
  );
}
