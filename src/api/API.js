import axios from "axios";

const url = "http://43.200.27.132:9000/AndyLogen/watcher";

export const signUp = (data) => {
  return axios.post(`${url}/sign`, { api: "signUp", data: data });
};

export const signIn = (data) => {
  return axios.post(`${url}/sign`, {
    api: "signIn",
    data: [data],
  });
};

export const changePassword = (data) => {
  return axios.post(`${url}/sign`, { api: "change", data: data });
};

export const modifyUser = (data) => {
  return axios.post(`${url}/sign`, { api: "userModify", data: data });
};
