import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { loginState } from "../stores/loginState";
import {
  HandexInstance,
  HanjinInstance,
  LogenInstance,
  LotteInstance,
} from "./instance";
import { IGetImageSettingResponse } from "../types/getImageSetting.types";
import { Dispatch, SetStateAction } from "react";

export const editImageSetting = (
  isOn: boolean,
  setIsOn: Dispatch<SetStateAction<boolean>>,
) => {
  const [login, setLogin] = useRecoilState(loginState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IGetImageSettingResponse, unknown, void, unknown>(
      "editImageSetting",
      () =>
        LogenInstance.post("/watcher/cam", {
          api: "camUsable",
          data: [
            {
              cam_status: isOn ? "0" : "1",
              bran_cd: login.branchCode,
              company: login.company,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            setIsOn(!isOn);
            setLogin({
              ...login,
              camStatus: login.camStatus === "0" ? "1" : "0",
            });
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
    return useMutation<IGetImageSettingResponse, unknown, void, unknown>(
      "editImageSetting",
      () =>
        LotteInstance.post("/watcher/cam", {
          api: "camUsable",
          data: [
            {
              cam_status: isOn ? "0" : "1",
              bran_cd: login.branchCode,
              company: login.company,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            setIsOn(!isOn);
            setLogin({
              ...login,
              camStatus: login.camStatus === "0" ? "1" : "0",
            });
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
    return useMutation<IGetImageSettingResponse, unknown, void, unknown>(
      "editImageSetting",
      () =>
        HanjinInstance.post("/watcher/cam", {
          api: "camUsable",
          data: [
            {
              cam_status: isOn ? "0" : "1",
              bran_cd: login.branchCode,
              company: login.company,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            setIsOn(!isOn);
            setLogin({
              ...login,
              camStatus: login.camStatus === "0" ? "1" : "0",
            });
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
    return useMutation<IGetImageSettingResponse, unknown, void, unknown>(
      "editImageSetting",
      () =>
        HandexInstance.post("/watcher/cam", {
          api: "camUsable",
          data: [
            {
              cam_status: isOn ? "0" : "1",
              bran_cd: login.branchCode,
              company: login.company,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            setIsOn(!isOn);
            setLogin({
              ...login,
              camStatus: login.camStatus === "0" ? "1" : "0",
            });
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }

  return useMutation<IGetImageSettingResponse, unknown, void, unknown>(
    "editImageSetting",
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
