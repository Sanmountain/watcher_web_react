import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router";
import { loginState } from "../stores/loginState";
import {
  HandexInstance,
  HanjinInstance,
  LogenInstance,
  LotteInstance,
} from "./instance";
import { IEditPasswordLaterResponse } from "../types/editPasswordLater.types";

export const editPasswordLater = () => {
  const login = useRecoilValue(loginState);

  const navigate = useNavigate();

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IEditPasswordLaterResponse, unknown, void, unknown>(
      "editPasswordLater",
      () =>
        LogenInstance.post("/watcher/sign", {
          api: "pwUpdateLater",
          data: [
            {
              user_id: login.branchCode,
              company: login.company,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00" || data.result === "77") {
            navigate("/");
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }
  // NOTE 롯데
  else if (login.company === "LOTTE") {
    return useMutation<IEditPasswordLaterResponse, unknown, void, unknown>(
      "editPasswordLater",
      () =>
        LotteInstance.post("/watcher/sign", {
          api: "pwUpdateLater",
          data: [
            {
              user_id: login.branchCode,
              company: login.company,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00" || data.result === "77") {
            navigate("/");
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }
  // NOTE 한진
  else if (login.company === "HANJIN") {
    return useMutation<IEditPasswordLaterResponse, unknown, void, unknown>(
      "editPasswordLater",
      () =>
        HanjinInstance.post("/watcher/sign", {
          api: "pwUpdateLater",
          data: [
            {
              user_id: login.branchCode,
              company: login.company,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00" || data.result === "77") {
            navigate("/");
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }
  // NOTE 한덱스
  else if (login.company === "HANDEX") {
    return useMutation<IEditPasswordLaterResponse, unknown, void, unknown>(
      "editPasswordLater",
      () =>
        HandexInstance.post("/watcher/sign", {
          api: "pwUpdateLater",
          data: [
            {
              user_id: login.branchCode,
              company: login.company,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00" || data.result === "77") {
            navigate("/");
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }

  return useMutation<IEditPasswordLaterResponse, unknown, void, unknown>(
    "editPasswordLater",
    () => {
      throw new Error("Invalid company");
    },
    {
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
