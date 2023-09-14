export interface ICameraInfoData {
  id: string;
  user_id: string;
  cam_order: string;
  cam_name: string;
  cam_id: string;
  cam_cloud_it: string;
  cam_user_id: string;
  cam_user_pw: string;
  company: string;
  cam_seq: string;
}

export interface ICameraInfoResponse {
  result: string;
  message: string;
  data: ICameraInfoData[];
}
