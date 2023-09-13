export interface ILoginState {
  isLogin: boolean;
  isUserIdStored: boolean;
  userId: string;
  branchName: string;
  localIP: string;
}

export interface ILoginData {
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
}

export interface ILoginResponse {
  result: string;
  message: string;
  data: ILoginData[];
}
