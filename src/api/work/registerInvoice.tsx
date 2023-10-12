import { useMutation } from "react-query";
import { LogenInstance, LotteInstance } from "../instance";
import {
  IFinalRegisteredData,
  IRegisterInvoiceResponse,
} from "../../types/registerInvoice.types";
import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";

export const registerInvoice = () => {
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
          if (data.result === "00") {
            console.log("등록 완료");
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
          if (data.result === "00") {
            console.log("data", data);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }
};
