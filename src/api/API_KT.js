import React, { useState, useEffect } from "react";
import axios from "axios";

const KT_API_URL = process.env.REACT_APP_KT_API;
const KT_API_USER = process.env.REACT_APP_KT_API_USER;
const KT_API_PASS = process.env.REACT_APP_KT_API_PASS;

const KT_API_USERKT_API_PASSBuffer = Buffer.from(
  KT_API_USER + ":" + KT_API_PASS
);
const base64data = KT_API_USERKT_API_PASSBuffer.toString("base64");

const App = () => {
  const [authTicket, setAuthTicket] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [axiosConfig, setAxiosConfig] = useState(null);

  useEffect(() => {
    async function setKTConfig() {
      const storedAuthTicket = localStorage.getItem("authTicket");
      const storedAuthToken = localStorage.getItem("authToken");
      const storedAccountId = localStorage.getItem("accountId");
      const storedClientIP = localStorage.getItem("clientIP");

      setAuthTicket(storedAuthTicket);
      setAuthToken(storedAuthToken);
      setAccountId(storedAccountId);

      console.log(`### setKTConfig()..AUTH_TICKET =>${storedAuthTicket}`);
      console.log(`### setKTConfig()..AUTH_TOKEN =>${storedAuthToken}`);
      console.log(`### setKTConfig()..ACCOUNT_ID =>${storedAccountId}`);
      console.log(`### setKTConfig()..AUTH_IP =>${storedClientIP}`);

      const axiosConfig = {
        headers: {
          Authorization: `Basic ${base64data}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "User-Agent":
            "GiGA Eyes (compatible;DeviceType/PC;DeviceModel/PC;OSType/PC;OSVersion/5.1.1;AppVersion/1.3.0;IpAddr/${auth.authIP};)",
          authToken: storedAuthToken,
        },
        timeout: 3500, // 3.5초 타임아웃.
      };

      console.log(
        "### setKTConfig()..AXIOS_CONFIG =>",
        JSON.stringify(axiosConfig)
      );
    }
    setKTConfig();
  }, []);

  // API 호출 함수를 정의합니다. 이 함수들은 하위 컴포넌트에서 사용할 수 있습니다.
  const getAuth = async () => {
    // AUTH_TOKEN 생성 로직을 여기에 구현합니다.
  };

  const getAccount = async () => {
    // 계정 조회 로직을 여기에 구현합니다.
  };

  const getCamera = async () => {
    // 카메라 조회 로직을 여기에 구현합니다.
  };

  const liveVideo = async () => {
    // 라이브 URL 취득 로직을 여기에 구현합니다.
  };

  const recordVideo = async () => {
    // 플레이백 URL 취득 로직을 여기에 구현합니다.
  };
};
