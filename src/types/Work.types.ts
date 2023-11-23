export interface IWorkListData {
  id: string;
  tm_dv: string;
  bran_cd: string;
  pob: string;
  car_num: string;
  barcode: string;
  barcode_sub: string;
  tg_bran_cd: string;
  scandate: string;
  scantime: string;
  scan_total_time: string;
  emp_cd: string;
  service_cd: string;
  arrive_cd: string;
  reason_cd: string;
  bulk_cargo_it: string;
  trans_equip: string;
  reg_date: string;
  update_date: string;
  longTime: string;
  dev_serial: string;
  dev_ver: string;
  seq: string;
  row_num: number;
  img_exists: boolean;
}

export interface IWorkListResponse {
  result: string;
  message: string;
  data: IWorkListData[];
}

export interface ICheckedItems {
  barcode: string;
  scandate: string;
}
