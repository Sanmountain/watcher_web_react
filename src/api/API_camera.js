import axios from "axios";

const url = "https://app.pairkorea.co.kr/kt_api";

export const getCameraList = (data) => {
  const saId = localStorage.getItem("saveSaId");
  const accountId = localStorage.getItem("saveAcId");
  const queryParams = `sa_id=${saId}&account_id=${accountId}`;
  return axios.get(`${url}/getCameraToken?${queryParams}`, {
    data: [data],
  });
};
