import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { HanjinInstance, LogenInstance, LotteInstance } from "../instance";
import { Dispatch, SetStateAction } from "react";
import {
  ICameraInfoData,
  ICameraInfoResponse,
} from "../../types/cameraInfo.types";

export const getCameraInfo = (
  setCameraInfo: Dispatch<SetStateAction<ICameraInfoData[]>>,
  setChangePlaySequence: Dispatch<SetStateAction<ICameraInfoData[]>>,
) => {
  const login = useRecoilValue(loginState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<ICameraInfoResponse, unknown, void, unknown>(
      "getCameraInfo",
      () =>
        LogenInstance.post("/watcher/cam", {
          api: "caminfo",
          data: [
            {
              user_id: login.userId,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            const sortedData = data.data.sort(
              (a, b) => parseInt(a.cam_seq) - parseInt(b.cam_seq),
            );
            setCameraInfo(sortedData);
            setChangePlaySequence(data.data);
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
    return useMutation<ICameraInfoResponse, unknown, void, unknown>(
      "getCameraInfo",
      () =>
        LotteInstance.post("/watcher/cam", {
          api: "caminfo",
          data: [
            {
              user_id: login.userId,
              company: "lotte",
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            const sortedData = data.data.sort(
              (a, b) => parseInt(a.cam_seq) - parseInt(b.cam_seq),
            );
            setCameraInfo(sortedData);
            setChangePlaySequence(data.data);
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
    return useMutation<ICameraInfoResponse, unknown, void, unknown>(
      "getCameraInfo",
      () =>
        HanjinInstance.post("/watcher/cam", {
          api: "caminfo",
          data: [
            {
              user_id: login.userId,
              company: "lotte",
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            const sortedData = data.data.sort(
              (a, b) => parseInt(a.cam_seq) - parseInt(b.cam_seq),
            );
            setCameraInfo(sortedData);
            setChangePlaySequence(data.data);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }

  return useMutation<ICameraInfoResponse, unknown, void, unknown>(
    "getCameraInfo",
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
