import { useRecoilValue } from "recoil";
import { useMutation } from "react-query";
import {
  HandexInstance,
  HanjinInstance,
  LogenInstance,
  LotteInstance,
} from "../instance";
import { Dispatch, SetStateAction } from "react";
import { nowVassDetailState } from "../../stores/vass/nowVassDetailState";
import { IImageResponse } from "../../types/getImage.types";
import { loginState } from "../../stores/loginState";

export const getImage = (
  setImageUrl: Dispatch<SetStateAction<string>>,
  setIsDisplayImageModal: Dispatch<SetStateAction<boolean>>,
) => {
  const login = useRecoilValue(loginState);
  const nowVassDetail = useRecoilValue(nowVassDetailState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IImageResponse, unknown, void, unknown>(
      "getImage",
      () =>
        LogenInstance.post("/loin", {
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
  }
  // NOTE 롯데
  else if (login.company === "LOTTE") {
    return useMutation<IImageResponse, unknown, void, unknown>(
      "getImage",
      () =>
        LotteInstance.post("/loin", {
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
  }
  // NOTE 한진
  else if (login.company === "HANJIN") {
    return useMutation<IImageResponse, unknown, void, unknown>(
      "getImage",
      () =>
        HanjinInstance.post("/loin", {
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
  }
  // NOTE 한덱스
  else if (login.company === "HANDEX") {
    return useMutation<IImageResponse, unknown, void, unknown>(
      "getImage",
      () =>
        HandexInstance.post("/loin", {
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
  }

  return useMutation<IImageResponse, unknown, void, unknown>(
    "getImage",
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
