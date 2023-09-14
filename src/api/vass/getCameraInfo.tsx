import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { instance } from "../instance";
import { Dispatch, SetStateAction } from "react";
import {
  ICameraInfoData,
  ICameraInfoResponse,
} from "../../types/cameraInfo.types";

export const getCameraInfo = (
  setCameraInfo: Dispatch<SetStateAction<ICameraInfoData[]>>,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<ICameraInfoResponse, unknown, void, unknown>(
    "getCameraInfo",
    () =>
      instance.post("/watcher/cam", {
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
          console.log("data", data);

          const sortedData = data.data.sort(
            (a, b) => parseInt(a.cam_seq) - parseInt(b.cam_seq),
          );
          setCameraInfo(sortedData);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
