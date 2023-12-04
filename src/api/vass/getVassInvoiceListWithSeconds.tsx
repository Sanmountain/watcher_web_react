import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { IWorkListResponse } from "../../types/Work.types";
import {
  HandexInstance,
  HanjinInstance,
  LogenInstance,
  LotteInstance,
} from "../instance";
import { vassListState } from "../../stores/vass/vassListState";
import { nowVassDetailState } from "../../stores/vass/nowVassDetailState";
import { prevVassDetailState } from "../../stores/vass/prevVassDetailState";

export const getVassInvoiceListWithSeconds = (searchInvoice: number | null) => {
  const login = useRecoilValue(loginState);
  const setVassList = useSetRecoilState(vassListState);
  const setNowVassDetail = useSetRecoilState(nowVassDetailState);
  const setPrevVassDetail = useSetRecoilState(prevVassDetailState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getVassInvoiceListWithSeconds",
      () =>
        LogenInstance.post("/lose", {
          api: "barcodeTime",
          data: [
            {
              bran_cd: login.branchCode,
              barcode: searchInvoice?.toString(),
              second: "5",
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            setVassList(data.data);

            const nowBarcodeIndex = data.data.findIndex(
              (vass) => vass.barcode === searchInvoice?.toString(),
            );
            setNowVassDetail(data.data[nowBarcodeIndex]);
            setPrevVassDetail(data.data[nowBarcodeIndex - 1]);
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
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getVassInvoiceListWithSeconds",
      () =>
        LotteInstance.post("/lose", {
          api: "barcodeTime",
          data: [
            {
              bran_cd: login.branchCode,
              barcode: searchInvoice?.toString(),
              second: "5",
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            setVassList(data.data);

            const nowBarcodeIndex = data.data.findIndex(
              (vass) => vass.barcode === searchInvoice?.toString(),
            );
            setNowVassDetail(data.data[nowBarcodeIndex]);
            setPrevVassDetail(data.data[nowBarcodeIndex - 1]);
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
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getVassInvoiceListWithSeconds",
      () =>
        HanjinInstance.post("/lose", {
          api: "barcodeTime",
          data: [
            {
              bran_cd: login.branchCode,
              barcode: searchInvoice?.toString(),
              second: "5",
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            setVassList(data.data);

            const nowBarcodeIndex = data.data.findIndex(
              (vass) => vass.barcode === searchInvoice?.toString(),
            );
            setNowVassDetail(data.data[nowBarcodeIndex]);
            setPrevVassDetail(data.data[nowBarcodeIndex - 1]);
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
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getVassInvoiceListWithSeconds",
      () =>
        HandexInstance.post("/lose", {
          api: "barcodeTime",
          data: [
            {
              bran_cd: login.branchCode,
              barcode: searchInvoice?.toString(),
              second: "5",
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            setVassList(data.data);

            const nowBarcodeIndex = data.data.findIndex(
              (vass) => vass.barcode === searchInvoice?.toString(),
            );
            setNowVassDetail(data.data[nowBarcodeIndex]);
            setPrevVassDetail(data.data[nowBarcodeIndex - 1]);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }

  return useMutation<IWorkListResponse, unknown, void, unknown>(
    "getVassInvoiceListWithSeconds",
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
