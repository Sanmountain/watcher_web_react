import axios from "axios";

const url = "http://openapi.kt.com";

export const signIn = (data) => {
  return axios.post(`${url}/loginKT`, {
    api: "signIn",
    data: [data],
  });
};
