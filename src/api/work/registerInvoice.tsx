import { useMutation } from "react-query";
import { LogenInstance, LotteInstance } from "../instance";
import {
  IFinalRegisteredData,
  IRegisterInvoiceResponse,
} from "../../types/registerInvoice.types";
import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import Swal from "sweetalert2";
import { Dispatch, SetStateAction } from "react";

export const registerInvoice = (
  setIsDisplayRegisterModal: Dispatch<SetStateAction<boolean>>,
) => {
  const login = useRecoilValue(loginState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<
      IRegisterInvoiceResponse,
      unknown,
      IFinalRegisteredData[],
      unknown
    >(
      "registerInvoice",
      (data) =>
        LogenInstance.post("/loin", {
          api: "dvAll",
          data,
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00" || data.result === "77") {
            setIsDisplayRegisterModal(false);
            Swal.fire({
              icon: "success",
              title: "등록 완료되었습니다.",
              confirmButtonText: "확인",
            });
          } else if (data.result === "fail") {
            Swal.fire({
              title: "Error!",
              icon: "error",
              text: "송장 등록에 실패했습니다. 다시 등록해주세요.",
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
      IRegisterInvoiceResponse,
      unknown,
      IFinalRegisteredData[],
      unknown
    >(
      "registerInvoice",
      (data) =>
        LotteInstance.post("/loin", {
          api: "dvAll",
          data,
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00" || data.result === "77") {
            setIsDisplayRegisterModal(false);
            Swal.fire({
              icon: "success",
              title: "등록 완료되었습니다.",
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
    IRegisterInvoiceResponse,
    unknown,
    IFinalRegisteredData[],
    unknown
  >(
    "registerInvoice",
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
