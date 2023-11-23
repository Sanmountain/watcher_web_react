import { useRecoilValue } from "recoil";
import { useMutation } from "react-query";
import { Dispatch, SetStateAction } from "react";
import { loginState } from "../stores/loginState";
import { IImageResponse } from "../types/getImage.types";
import {
  HandexInstance,
  HanjinInstance,
  LogenInstance,
  LotteInstance,
} from "./instance";

export const getImageInImagePage = (
  setImageUrl: Dispatch<SetStateAction<string>>,
  setIsDisplayImageModal: Dispatch<SetStateAction<boolean>>,
) => {
  const login = useRecoilValue(loginState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<
      IImageResponse,
      unknown,
      { barcode: string; scanDate: string },
      unknown
    >(
      "getImageInImagePage",
      ({ barcode, scanDate }) =>
        LogenInstance.post("/loin", {
          api: "imgGet",
          data: [
            {
              barcode,
              scandate: scanDate,
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
    return useMutation<
      IImageResponse,
      unknown,
      { barcode: string; scanDate: string },
      unknown
    >(
      "getImageInImagePage",
      ({ barcode, scanDate }) =>
        LotteInstance.post("/loin", {
          api: "imgGet",
          data: [
            {
              barcode,
              scandate: scanDate,
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
    return useMutation<
      IImageResponse,
      unknown,
      { barcode: string; scanDate: string },
      unknown
    >(
      "getImageInImagePage",
      ({ barcode, scanDate }) =>
        HanjinInstance.post("/loin", {
          api: "imgGet",
          data: [
            {
              barcode,
              scandate: scanDate,
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
    return useMutation<
      IImageResponse,
      unknown,
      { barcode: string; scanDate: string },
      unknown
    >(
      "getImageInImagePage",
      ({ barcode, scanDate }) =>
        HandexInstance.post("/loin", {
          api: "imgGet",
          data: [
            {
              barcode,
              scandate: scanDate,
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

  return useMutation<
    IImageResponse,
    unknown,
    { barcode: string; scanDate: string },
    unknown
  >(
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
