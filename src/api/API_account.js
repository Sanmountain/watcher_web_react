import axios from "axios";

const url = "http://15.164.110.244";

export const getKtToken = (data) => {
  return axios.post(`${url}/getToken`, data);
};
