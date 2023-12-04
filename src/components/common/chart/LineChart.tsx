import { ResponsiveLine } from "@nivo/line";
import { colors } from "../../../styles/palette";
import { useEffect, useState } from "react";
import { IWeekChartData } from "../../../types/weekChart.types";
import { getMonthChart } from "../../../api/dashboard/getMonthChart";
import * as S from "../../../styles/Dashboard.styles";
import Loading from "../Loading";
import { useRecoilValue } from "recoil";
import { loginState } from "../../../stores/loginState";

export default function LineChart() {
  const [monthData, setMonthData] = useState<IWeekChartData[]>([]);
  const login = useRecoilValue(loginState);

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

    let handexCountIn = 0;
    let handexCountOut = 0;
    let handexCountPick = 0;

    if (Array.isArray(item.count) && item.count.length === 3) {
      handexCountIn = parseInt(item.count[0], 10);
      handexCountOut = parseInt(item.count[1], 10);
      handexCountPick = parseInt(item.count[2], 10);
    } else {
      handexCountIn = countIn;
      handexCountOut = countOut;
      handexCountPick = 0;
    }

    return {
      scandate: item.scandate,
      handexCountIn,
      handexCountOut,
      handexCountPick,
    };
  });

  const lineChartData = [
    {
      id: "handexCountIn",
      data: revertMonthDataCountNumber.map((item) => ({
        x: item.scandate,
        y: item.handexCountIn,
      })),
    },
    {
      id: "handexCountOut",
      data: revertMonthDataCountNumber.map((item) => ({
        x: item.scandate,
        y: item.handexCountOut,
      })),
    },
    {
      id: "handexCountPick",
      data: revertMonthDataCountNumber.map((item) => ({
        x: item.scandate,
        y: item.handexCountPick,
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
        colors={[
          `${colors.green[100]}`,
          `${colors.blue[100]}`,
          `${colors.yellow[100]}`,
        ]}
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
        pointSize={15}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        lineWidth={5}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 100,
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
            data: [
              {
                id: "handexCountIn",
                label:
                  login.company === "LOGEN"
                    ? "배송입고"
                    : login.company === "LOTTE"
                      ? "도착"
                      : login.company === "HANJIN"
                        ? "간선상차"
                        : "영업소상차",
                color: colors.green[100],
              },
              {
                id: "handexCountOut",
                label:
                  login.company === "LOGEN"
                    ? "집하출고"
                    : login.company === "LOTTE"
                      ? "발송"
                      : login.company === "HANJIN"
                        ? "간선하차"
                        : "영업소하차",
                color: colors.blue[100],
              },
              {
                id: "handexCountPick",
                label: login.company === "HANDEX" ? "상품집하" : "",
                color: colors.yellow[100],
                hidden: login.company !== "HANDEX",
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
