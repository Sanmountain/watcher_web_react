export interface IVideoListData {
  cam_id: string;
  cam_name: string;
  end_time: string;
  start_time: string;
  stream_url: string;
}

export interface IVideoListResponse {
  result: string;
  message: string;
  cam_list: IVideoListData[];
}
