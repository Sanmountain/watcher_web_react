export interface IVassTrackingData {
  fare: string;
  pick_trade_cd: string;
  dv_tradesub_nm: string;
  dv_date: string;
  qa: string;
  relation_list: {
    iv_type: string;
    iv_no_relation: string;
  }[];
  order_addres_doro: string;
  order_post_cd: string;
  pick_trade_nm: string;
  pick_tradesub_tel: string;
  level: string;
  total_fare: string;
  pick_tradesub_cd: string;
  dv_tradesub_cd: string;
  order_address_jibun: string;
  mount_fare: string;
  dv_nm: string;
  dv_tradesub_tel: string;
  iv_type: string;
  flight_fare: string;
  trace_list: {
    tok_send: string;
    trade_cd: string;
    scan_time: string;
    scan_date: string;
    dv_time_nm: string;
    trade_nm: string;
    state_nm: string;
  }[];
  dv_tel: string;
  bigo: string;
  order_nm: string;
  dv_tel_hd: string;
  goods_nm: string;
  trust_nm: string;
  dv_img: string;
  dv_address_doro: string;
  order_tel_hd: string;
  dv_post_cd: string;
  pick_tradesub_nm: string;
  fare_type: string;
  flight_fare_type: string;
  result: string;
  dv_address_jibun: string;
  sign_img: string;
  pick_date: string;
  spout_trade_nm: string;
  add_fare: string;
  dv_trade_nm: string;
  island_fare: string;
  is_send: string;
  is_getInfo: string;
  consign_it: string;
  spout_trade_nm2: string;
  message: string;
  island_fare_type: string;
  order_date: string;
  dv_trade_cd: string;
  consign_nm: string;
  cust_cd: string;
}

export interface IVassTrackingDataResponse {
  result: string;
  message: string;
  data: IVassTrackingData;
}
