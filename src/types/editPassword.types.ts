export interface IEditPasswordData {
  count: number;
  duplication: number;
  duplication_list: string[];
  fail: number;
  fail_list: string[];
  success_list: string[];
}

export interface IEditPasswordResponse {
  result: string;
  message: string;
  data: IEditPasswordData[];
}
