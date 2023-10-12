import { useMutation } from "react-query";
import { HanjinInstance, LogenInstance, LotteInstance } from "../instance";
import { Dispatch, SetStateAction } from "react";
import {
  ICameraInfoData,
  ICameraInfoResponse,
} from "../../types/cameraInfo.types";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";

export const editCameraSequence = (
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  changePlaySequence: ICameraInfoData[],
  setCameraInfo: Dispatch<SetStateAction<ICameraInfoData[]>>,
) => {
  const login = useRecoilValue(loginState);

  const idArray = changePlaySequence.map((el) => el.id);
  const sequenceArray = changePlaySequence.map((el) => el.cam_seq);
  const nameArray = changePlaySequence.map((el) => el.cam_name);

  const modifyData = idArray.map((id, index) => ({
    id,
    cam_seq: sequenceArray[index],
    cam_name: nameArray[index],
  }));

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<ICameraInfoResponse, unknown, void, unknown>(
      "editCameraSequence",
      () =>
        LogenInstance.post("/watcher/cam", {
          api: "camModify",
          data: modifyData,
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            setIsModalOpen(false);
            setCameraInfo(changePlaySequence);

            Swal.fire({
              icon: "success",
              title: "저장 완료",
              confirmButtonText: "확인",
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
    return useMutation<ICameraInfoResponse, unknown, void, unknown>(
      "editCameraSequence",
      () =>
        LotteInstance.post("/watcher/cam", {
          api: "camModify",
          data: modifyData,
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            setIsModalOpen(false);
            setCameraInfo(changePlaySequence);

            Swal.fire({
              icon: "success",
              title: "저장 완료",
              confirmButtonText: "확인",
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
    return useMutation<ICameraInfoResponse, unknown, void, unknown>(
      "editCameraSequence",
      () =>
        HanjinInstance.post("/watcher/cam", {
          api: "camModify",
          data: modifyData,
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            setIsModalOpen(false);
            setCameraInfo(changePlaySequence);

            Swal.fire({
              icon: "success",
              title: "저장 완료",
              confirmButtonText: "확인",
            });
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }
};
