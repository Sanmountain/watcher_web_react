import { useMutation } from "react-query";
import { instance } from "../instance";
import {
  IFinalRegisteredData,
  IRegisterInvoiceResponse,
} from "../../types/registerInvoice.types";

export const registerInvoice = () => {
  return useMutation<
    IRegisterInvoiceResponse,
    unknown,
    IFinalRegisteredData[],
    unknown
  >(
    "registerInvoice",
    (data) =>
      instance.post("/loin", {
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
};
