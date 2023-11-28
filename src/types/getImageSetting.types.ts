export interface IGetImageSettingData {
  user_id: string;
  user_password: string;
  cam_name: string;
  reg_date: string;
  update_date: string;
  app_ver: string;
  bran_cd: string;
  bran_exp: string;
  cam_usable: string;
  salt: string;
  time_change_usable: string;
  sa_id: string;
  account_id: string;
  company: string;
  premium_it: string;
  password_change_date: string;
  password_change_it: string;
  cam_status: string;
}

export interface IGetImageSettingResponse {
  result: string;
  message: string;
  data: IGetImageSettingData[];
}
