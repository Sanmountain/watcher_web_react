import { useMutation } from "react-query";
import { instance } from "../instance";
import { Dispatch, SetStateAction } from "react";
import {
  ICameraInfoData,
  ICameraInfoResponse,
} from "../../types/cameraInfo.types";
import Swal from "sweetalert2";

export const editCameraSequence = (
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  changePlaySequence: ICameraInfoData[],
  setCameraInfo: Dispatch<SetStateAction<ICameraInfoData[]>>,
) => {
  const idArray = changePlaySequence.map((el) => el.id);
  const sequenceArray = changePlaySequence.map((el) => el.cam_seq);
  const nameArray = changePlaySequence.map((el) => el.cam_name);

  const modifyData = idArray.map((id, index) => ({
    id,
    cam_seq: sequenceArray[index],
    cam_name: nameArray[index],
  }));

  return useMutation<ICameraInfoResponse, unknown, void, unknown>(
    "editCameraSequence",
    () =>
      instance.post("/watcher/cam", {
        api: "camModify",
        data: [modifyData],
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
};
