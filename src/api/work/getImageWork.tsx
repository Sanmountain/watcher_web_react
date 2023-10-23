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
    return useMutation<IImageResponse, unknown, void, unknown>(
      "getImageWork",
      (barcode) =>
        LogenInstance.post("/loin", {
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
  }
  // NOTE 롯데
  else if (login.company === "LOTTE") {
    return useMutation<IImageResponse, unknown, void, unknown>(
      "getImageWork",
      (barcode) =>
        LotteInstance.post("/loin", {
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
  }
  // NOTE 한진
  else if (login.company === "HANJIN") {
    return useMutation<IImageResponse, unknown, void, unknown>(
      "getImageWork",
      (barcode) =>
        HanjinInstance.post("/loin", {
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
  }
  // NOTE 한덱스
  else if (login.company === "HANDEX") {
    return useMutation<IImageResponse, unknown, void, unknown>(
      "getImageWork",
      (barcode) =>
        HandexInstance.post("/loin", {
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
  }

  return useMutation<IImageResponse, unknown, void, unknown>(
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
