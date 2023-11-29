import { ResponsiveBar } from "@nivo/bar";
import { colors } from "../../../styles/palette";
import { useEffect, useState } from "react";
import { getWeekChart } from "../../../api/dashboard/getWeekChart";
import { IWeekChartData } from "../../../types/weekChart.types";
import Loading from "../Loading";
import * as S from "../../../styles/Dashboard.styles";
import { useRecoilValue } from "recoil";
import { loginState } from "../../../stores/loginState";

export default function BarChart() {
  const [weekData, setWeekData] = useState<IWeekChartData[]>([]);
  const login = useRecoilValue(loginState);

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
      week: item.week,
      handexCountIn,
      handexCountOut,
      handexCountPick,
    };
  });

  return (
    <>
      <ResponsiveBar
        data={revertWeekDataCountNumber}
        keys={["handexCountIn", "handexCountOut", "handexCountPick"]}
        indexBy="week"
        margin={{ top: 20, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={[
          `${colors.green[100]}`,
          `${colors.blue[100]}`,
          `${colors.yellow[100]}`,
        ]}
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
      {isWeekChartLoading && (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      )}
    </>
  );
}
