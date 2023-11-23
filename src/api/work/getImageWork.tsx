import { useMutation } from "react-query";
import {
  HandexInstance,
  HanjinInstance,
  LogenInstance,
  LotteInstance,
} from "../instance";
import { Dispatch, SetStateAction } from "react";
import { IImageResponse } from "../../types/getImage.types";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";

export const getImageWork = (
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
      "getImageWork",
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
          if (data.result === "00" || data.result === "77") {
            if (data.data[0]) {
              setIsDisplayImageModal(true);
              const imgUrl = "data:image/jpeg;base64," + data.data[0].img;
              setImageUrl(imgUrl);
            } else {
              Swal.fire({
                icon: "warning",
                title: "오토스캐너 PC에서 사진 전송을 해주세요.",
                confirmButtonText: "확인",
              });
            }
          } else if (data.result === "04") {
            Swal.fire({
              title: "Error!",
              icon: "error",
              text: "이미지 조회에 실패했습니다.",
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
    return useMutation<
      IImageResponse,
      unknown,
      { barcode: string; scanDate: string },
      unknown
    >(
      "getImageWork",
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
          if (data.result === "00" || data.result === "77") {
            if (data.data[0]) {
              setIsDisplayImageModal(true);
              const imgUrl = "data:image/jpeg;base64," + data.data[0].img;
              setImageUrl(imgUrl);
            } else {
              Swal.fire({
                icon: "warning",
                title: "오토스캐너 PC에서 사진 전송을 해주세요.",
                confirmButtonText: "확인",
              });
            }
          } else if (data.result === "04") {
            Swal.fire({
              title: "Error!",
              icon: "error",
              text: "이미지 조회에 실패했습니다.",
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
    return useMutation<
      IImageResponse,
      unknown,
      { barcode: string; scanDate: string },
      unknown
    >(
      "getImageWork",
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
          if (data.result === "00" || data.result === "77") {
            if (data.data[0]) {
              setIsDisplayImageModal(true);
              const imgUrl = "data:image/jpeg;base64," + data.data[0].img;
              setImageUrl(imgUrl);
            } else {
              Swal.fire({
                icon: "warning",
                title: "오토스캐너 PC에서 사진 전송을 해주세요.",
                confirmButtonText: "확인",
              });
            }
          } else if (data.result === "04") {
            Swal.fire({
              title: "Error!",
              icon: "error",
              text: "이미지 조회에 실패했습니다.",
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
  // NOTE 한덱스
  else if (login.company === "HANDEX") {
    return useMutation<
      IImageResponse,
      unknown,
      { barcode: string; scanDate: string },
      unknown
    >(
      "getImageWork",
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
          if (data.result === "00" || data.result === "77") {
            if (data.data[0]) {
              setIsDisplayImageModal(true);
              const imgUrl = "data:image/jpeg;base64," + data.data[0].img;
              setImageUrl(imgUrl);
            } else {
              Swal.fire({
                icon: "warning",
                title: "오토스캐너 PC에서 사진 전송을 해주세요.",
                confirmButtonText: "확인",
              });
            }
          } else if (data.result === "04") {
            Swal.fire({
              title: "Error!",
              icon: "error",
              text: "이미지 조회에 실패했습니다.",
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

  return useMutation<
    IImageResponse,
    unknown,
    { barcode: string; scanDate: string },
    unknown
  >(
    "getImageWork",
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
