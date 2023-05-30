import axios from "axios";

const url = "https://int.api.kt.com/gigaeyes/v1.0";

export const getRecordVideoList = (data) => {
  const authToken = sessionStorage.getItem("authToken");
  const authorization = sessionStorage.getItem("authorization");
  const cam_ids = sessionStorage.getItem("cam_ids");

  return axios.post(`${url}/recordVideoList`, {
    headers: {
      Authorization: `Basic ${authorization}`,
      "Content-Type": "application/json;charset=UTF-8",
      "User-Agent":
        "GiGAeyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/0.0.0.1)",
      authToken: authToken,
    },
  });
};
