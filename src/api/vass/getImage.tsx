import { useRecoilValue } from "recoil";
import { useMutation } from "react-query";
import { instance } from "../instance";
import { Dispatch, SetStateAction } from "react";
import { nowVassDetailState } from "../../stores/vass/nowVassDetailState";
import { IImageResponse } from "../../types/getImage.types";

export const getImage = (
  setImageUrl: Dispatch<SetStateAction<string>>,
  setIsDisplayImageModal: Dispatch<SetStateAction<boolean>>,
) => {
  const nowVassDetail = useRecoilValue(nowVassDetailState);

  return useMutation<IImageResponse, unknown, void, unknown>(
    "getImage",
    () =>
      instance.post("/loin", {
        api: "imgGet",
        data: [
          {
            barcode: nowVassDetail.barcode,
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
          }
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
