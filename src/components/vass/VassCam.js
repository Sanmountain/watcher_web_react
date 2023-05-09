import { useState, useEffect } from "react";
import { getKtToken } from "../../api/API_account";

const useKTAuthToken = (saId) => {
  const [ktAuthToken, setKtAuthToken] = useState(null);

  useEffect(() => {
    async function getKTAuthenToken() {
      try {
        const response = await getKtToken({
          saId: "",
        });
        if (response.data.result === "00") {
          setKtAuthToken(response.data);
          console.log("## getKTAuthenToken =>", response.data);
        } else {
          alert("Token 저장 실패");
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (saId) {
      getKTAuthenToken();
    }
  }, [saId]);
  return ktAuthToken;
};

export default useKTAuthToken;
