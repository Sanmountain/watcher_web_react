import axios from "axios";

const url = "http://43.200.27.132:9000/AndyLogen";

// const url2 = "http://52.78.165.22:8080/AndyLogen";

export const signUp = (data) => {
  return axios.post(`${url}/sign`, { api: "signUp", data: data });
};

export const signIn = (data) => {
  return axios.post(`${url}/watcher/sign`, {
    api: "signIn",
    data: [data],
  });
};

export const dvInAll = (data) => {
  return axios.post(`${url}/lose`, {
    api: "dvInAll",
    data: [data],
  });
};

export const sendSelect = (data) => {
  return axios.post(`${url}/send`, {
    api: "sendSelect",
    data: [data],
  });
};

export const autoChange = (bran_cd, auto) => {
  return axios.post(`${url}/autoChange`, { bran_cd, auto });
};

export const autoCheck = (postData) => {
  return axios.post(`${url}/autoCheck`, postData);
};

export const caminfo = (data) => {
  return axios.post(`${url}/watcher/cam`, {
    api: "caminfo",
    data: [data],
  });
};

export const camModify = (data) => {
  return axios.post(`${url}/watcher/cam`, {
    api: "camModify",
    data: data,
  });
};
