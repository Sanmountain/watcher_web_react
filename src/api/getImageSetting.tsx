import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import { loginState } from "../stores/loginState";
import {
  HandexInstance,
  HanjinInstance,
  LogenInstance,
  LotteInstance,
} from "./instance";
import { IGetImageSettingResponse } from "../types/getImageSetting.types";
import { Dispatch, SetStateAction } from "react";

export const getImageSetting = (setIsOn: Dispatch<SetStateAction<boolean>>) => {
  const login = useRecoilValue(loginState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IGetImageSettingResponse, unknown, void, unknown>(
      "getImageSetting",
      () =>
        LogenInstance.post("/watcher/cam", {
          api: "camUsableInfo",
          data: [{ bran_cd: login.branchCode, company: login.company }],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            data.data[0].cam_status === "0" && setIsOn(false);
            data.data[0].cam_status === "1" && setIsOn(true);
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
      "getImageSetting",
      () =>
        LotteInstance.post("/watcher/cam", {
          api: "camUsableInfo",
          data: [{ bran_cd: login.branchCode, company: login.company }],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            data.data[0].cam_status === "0" && setIsOn(false);
            data.data[0].cam_status === "1" && setIsOn(true);
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
      "getImageSetting",
      () =>
        HanjinInstance.post("/watcher/cam", {
          api: "camUsableInfo",
          data: [{ bran_cd: login.branchCode, company: login.company }],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            data.data[0].cam_status === "0" && setIsOn(false);
            data.data[0].cam_status === "1" && setIsOn(true);
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
      "getImageSetting",
      () =>
        HandexInstance.post("/watcher/cam", {
          api: "camUsableInfo",
          data: [{ bran_cd: login.branchCode, company: login.company }],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            data.data[0].cam_status === "0" && setIsOn(false);
            data.data[0].cam_status === "1" && setIsOn(true);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }

  return useMutation<IGetImageSettingResponse, unknown, void, unknown>(
    "getImageSetting",
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
