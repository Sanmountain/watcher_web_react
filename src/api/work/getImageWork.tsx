import { useMutation } from "react-query";
import { instance } from "../instance";
import { Dispatch, SetStateAction } from "react";
import { IImageResponse } from "../../types/getImage.types";
import Swal from "sweetalert2";

export const getImageWork = (
  setImageUrl: Dispatch<SetStateAction<string>>,
  setIsDisplayImageModal: Dispatch<SetStateAction<boolean>>,
) => {
  return useMutation<IImageResponse, unknown, void, unknown>(
    "getImageWork",
    (barcode) =>
      instance.post("/loin", {
        api: "imgGet",
        data: [
          {
            barcode,
          },
        ],
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          if (data.data[0]) {
            setIsDisplayImageModal(true);
            const imgUrl = "data:image/jpeg;base64," + data.data[0].img;
            setImageUrl(imgUrl);
          } else {
            Swal.fire({
              icon: "warning",
              title: "이미지가 없는 송장번호입니다.",
              confirmButtonText: "확인",
            });
          }
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
