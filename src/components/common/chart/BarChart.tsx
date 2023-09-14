import { ResponsiveBar } from "@nivo/bar";
import { colors } from "../../../styles/palette";

export default function BarChart() {
  return (
    <ResponsiveBar
      data={[
        {
          country: "USA",
          "hot dog": 29,
          burger: 99,
          sandwich: 45,
        },
        {
          country: "Germany",
          "hot dog": 13,
          burger: 46,
          sandwich: 20,
        },
        {
          country: "France",
          "hot dog": 22,
          burger: 12,
          sandwich: 50,
        },
      ]}
      //   keys={["count"]}
      keys={["hot dog", "burger", "sandwich"]}
      indexBy="week"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
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
  );
}
