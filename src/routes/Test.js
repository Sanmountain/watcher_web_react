import React, { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    sendPostRequest();
  }, []);

  async function sendPostRequest() {
    try {
      const url = "https://int.api.kt.com/gigaeyes/v1.0/authToken";
      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization:
          "Basic QUlJMTg0MDA1MDc2MExTQUZXWDpTVksxODQwMDUwNzYwV0FLTVNI",
      };
      const data = {
        request: {
          auth_ticket:
            "J2OMBk+WekUGTwJoK7f0eTPcQOVtEMriDl/ys6QHIfwmlsJvMcVrOxUcgJeSeExdEojO3n3YiOnJyAtNS3r2xg==",
          offset_position: "700",
          offset_length: "128",
          site_id: "JHC_CTRL_001",
        },
      };

      const response = await axios.post(url, data, { headers });
      console.log(response.data); // 서버 응답 데이터
    } catch (error) {
      console.error(error);
    }
  }

  return <div className="App">{/* 컴포넌트 내용 */}</div>;
}

export default App;
