import { ResponsiveLine } from "@nivo/line";
import { colors } from "../../../styles/palette";

export default function LineChart() {
  return (
    <ResponsiveLine
      data={[
        {
          id: "cola",
          data: [
            { x: "365ml", y: 1200 },
            { x: "500ml", y: 2200 },
            { x: "1000ml", y: 3200 },
          ],
        },
        {
          id: "cidar",
          data: [
            { x: "365ml", y: 1000 },
            { x: "500ml", y: 2000 },
            { x: "1000ml", y: 3000 },
          ],
        },
      ]}
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
  );
}
