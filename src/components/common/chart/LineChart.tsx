import { font } from "../../../styles/typography";
import { colors } from "../../../styles/palette";
import { useEffect, useRef, useState } from "react";
import { IWeekChartData } from "../../../types/weekChart.types";
import { getMonthChart } from "../../../api/dashboard/getMonthChart";
import * as S from "../../../styles/Dashboard.styles";
import * as d3 from "d3";
import Loading from "../Loading";

export default function LineChart() {
  const [monthData, setMonthData] = useState<IWeekChartData[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const { mutate: monthChartMutate, isLoading: isMonthChartLoading } =
    getMonthChart(setMonthData);

  useEffect(() => {
    monthChartMutate();
  }, []);

  const revertMonthDataCountNumber = monthData?.map((item) => ({
    scandate: item.scandate,
    count: parseInt(item.count, 10),
  }));

  console.log(revertMonthDataCountNumber);

  useEffect(() => {
    if (!svgRef.current) return;

    const svgWidth = svgRef.current.clientWidth;
    const svgHeight = svgRef.current.clientHeight;

    if (!isMonthChartLoading && revertMonthDataCountNumber) {
      // NOTE 기본으로 그려지는 svg reset
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // NOTE 차트 전체 묶기
      const chartGroup = svg.append("g").attr("transform", `translate(50, 0)`);

      // NOTE X축
      const xScale = d3
        .scalePoint()
        .domain(revertMonthDataCountNumber.map((data) => data.scandate))
        .range([0, svgWidth - 30]);

      const xAxis = chartGroup
        .append("g")
        .attr("transform", `translate(0, ${svgHeight - 100})`)
        .call(d3.axisBottom(xScale));

      xAxis.select(".domain").attr("stroke", `${colors.green[100]}`);

      xAxis
        .selectAll("text")
        .text((d: any) => d.split("_")[0])
        .attr("font-size", `${font.fontSize[500]}`)
        .attr("font-weight", 700)
        .attr("fill", `${colors.green[100]}`) // x축 글씨색
        .attr("text-anchor", "end"); // 회전 후 텍스트 위치 조정

      // NOTE Y축
      const yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(revertMonthDataCountNumber, (data) => data.count) || 0,
        ])
        .range([svgHeight - 100, 0]);

      const yAxis = chartGroup.append("g").call(d3.axisLeft(yScale));

      yAxis
        .selectAll("text")
        .attr("font-size", `${font.fontSize[500]}`)
        .attr("fill", `${colors.green[100]}`); // y축 글씨색

      yAxis.select(".domain").attr("stroke", `${colors.green[100]}`); // y축 선색

      const myLine = d3
        .line<{ scandate: string; count: number }>()
        .x((data) => xScale(data.scandate) || 0)
        .y((data) => yScale(data.count) || 0);

      chartGroup
        .selectAll(".line")
        .data([revertMonthDataCountNumber])
        .join("path")
        .attr("class", "line")
        .attr("d", (data) => myLine(data))
        .attr("fill", "none")
        .attr("stroke", `${colors.green[100]}`);

      chartGroup
        .selectAll(".text")
        .data(revertMonthDataCountNumber)
        .join("text")
        .attr("class", "label")
        .attr("x", (data) => (xScale(data.scandate) || 0) + -10)
        .attr("y", (data) => (yScale(data.count) || 0) + 20)
        .text((data) => (data.count !== 0 ? data.count : ""))
        .attr("font-size", `${font.fontSize[500]}`)
        .attr("fill", `${colors.green[100]}`);
    }
  }, [isMonthChartLoading, revertMonthDataCountNumber]);

  return (
    <>
      <svg
        ref={svgRef}
        style={{
          background: "#fff",
          padding: "10px",
          width: "700px",
          height: "550px",
        }}
      >
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      {isMonthChartLoading && (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      )}
    </>
  );
}
