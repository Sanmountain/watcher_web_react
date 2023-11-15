import { useEffect, useRef, useState } from "react";
import { getWeekChart } from "../../../api/dashboard/getWeekChart";
import { IWeekChartData } from "../../../types/weekChart.types";
import Loading from "../Loading";
import * as S from "../../../styles/Dashboard.styles";
import * as d3 from "d3";
import { colors } from "../../../styles/palette";
import { font } from "../../../styles/typography";

export default function BarChart() {
  const [weekData, setWeekData] = useState<IWeekChartData[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const { mutate: weekChartMutate, isLoading: isWeekChartLoading } =
    getWeekChart(setWeekData);

  useEffect(() => {
    weekChartMutate();
  }, []);

  const revertWeekDataCountNumber = weekData?.map((item) => ({
    week: item.week,
    count: parseInt(item.count, 10),
  }));

  useEffect(() => {
    if (!svgRef.current) return;

    const svgWidth = svgRef.current.clientWidth;
    const svgHeight = svgRef.current.clientHeight;

    if (!isWeekChartLoading && revertWeekDataCountNumber) {
      // NOTE 기본으로 그려지는 svg reset
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // NOTE 차트 전체 묶기
      const chartGroup = svg.append("g").attr("transform", `translate(50,0)`);

      // NOTE X축
      const xScale = d3
        .scaleBand()
        .range([0, svgWidth - 30])
        .padding(0.4)
        .domain(revertWeekDataCountNumber.map((data) => data.week));

      const xAxis = chartGroup
        .append("g")
        .attr("transform", `translate(0, ${svgHeight - 50})`)
        .call(d3.axisBottom(xScale));

      xAxis.select(".domain").attr("stroke", `${colors.green[100]}`); // x축 선색

      xAxis
        .selectAll("text")
        .text((d: any) => d.split("_")[0])
        .attr("font-size", `${font.fontSize[200]}`)
        .attr("font-weight", 700)
        .attr("fill", `${colors.green[100]}`) // x축 글씨색
        .attr("text-anchor", "end"); // 회전 후 텍스트 위치 조정

      // NOTE Y축
      const yScale = d3
        .scaleLinear()
        .range([svgHeight - 50, 0])
        .domain([
          0,
          d3.max(revertWeekDataCountNumber, (data) => data.count) || 0,
        ]);

      const yAxis = chartGroup.append("g").call(d3.axisLeft(yScale));

      yAxis
        .selectAll("text")
        .attr("font-size", `${font.fontSize[500]}`)
        .attr("fill", `${colors.green[100]}`); // y축 글씨색

      yAxis.select(".domain").attr("stroke", `${colors.green[100]}`); // y축 선색

      // NOTE 막대그래프 표시
      chartGroup
        .selectAll("rect")
        .data(revertWeekDataCountNumber)
        .enter()
        .append("rect")
        .attr("x", (s) => xScale(s.week) || "")
        .attr("y", (s) => yScale(s.count))
        .attr("height", (s) => yScale(0) - yScale(s.count))
        .attr("width", xScale.bandwidth())
        .style("fill", `${colors.green[100]}`);

      // NOTE 막대그래프 내 값 표시
      chartGroup
        .selectAll("text.count")
        .data(revertWeekDataCountNumber)
        .join("text")
        .attr("class", "count")
        .attr("x", (s) => (xScale(s.week) || 0) + xScale.bandwidth() + -40) // 위치조정
        .attr("y", (s) => yScale(s.count) + (yScale(0) - yScale(s.count)) / 2)
        .text((s) => (s.count !== 0 ? s.count : ""))
        .attr("dominant-baseline", "hanging")
        .attr("font-size", `${font.fontSize[500]}`)
        .attr("fill", `${colors.black[1000]}`);
    }
  }, [isWeekChartLoading, revertWeekDataCountNumber]);

  return (
    <>
      <svg
        ref={svgRef}
        style={{
          background: "#fff",
          padding: "10px",
          width: "700px",
          height: "500px",
        }}
      ></svg>
      {isWeekChartLoading && (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      )}
    </>
  );
}
