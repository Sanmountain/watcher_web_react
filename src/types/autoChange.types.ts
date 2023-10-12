export interface IAutoChangeData {
  count: number;
  duplication: number;
  duplication_list: any[];
  fail: number;
  success_list: string[];
}

export interface IAutoChangeResponse {
  result: string;
  message: string;
  data: IAutoChangeData[];
}
