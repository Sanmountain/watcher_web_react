export interface IRegisterInvoiceData {
  count: number;
  fail: number;
  duplication: number;
  success_list: string[];
  fail_list: string[];
  duplication_list: string[];
}

export interface IRegisterInvoiceResponse {
  result: string;
  message: string;
  data: IRegisterInvoiceData;
}

export interface IRegisteredData {
  tm_dv: string;
  scandate: string;
  bran_cd: string;
  car_num: string;
  emp_cd: string;
  tg_bran_cd: string;
  pob: string;
  barcode: string;
}

export interface IFinalRegisteredData extends IRegisteredData {
  scantime: string;
  scan_total_time: string;
  dev_ver: string;
  dev_serial: string;
}

export interface IRegisterModalStatusData {
  bran_cd: string;
  car_num: string;
  emp_cd: string;
  last_scan_time: string;
  pob: string;
  scandate: string;
  tg_bran_cd: string;
  tm_dv: string;
}

export interface IRegisterModalStatusResponse {
  message: string;
  result: string;
  data: IRegisterModalStatusData[];
}
