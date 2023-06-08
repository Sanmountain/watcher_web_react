import axios from "axios";

const url = "https://app.pairkorea.co.kr/kt_api";

export const getRecordVideoList = (data) => {
  return axios.post(`${url}/getRecordVideoList`, {
    data: [data],
  });
};
