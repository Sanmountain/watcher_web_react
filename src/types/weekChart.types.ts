export interface IWeekChartData {
  count: string;
  scandate: string;
  week: string;
}

export interface IChartProps {
  chartData: IWeekChartData[];
}

export interface IWeekChartResponse {
  message: string;
  result: string;
  data: IWeekChartData[];
}
