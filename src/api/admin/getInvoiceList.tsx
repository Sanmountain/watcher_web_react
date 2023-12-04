import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { IWorkListData, IWorkListResponse } from "../../types/Work.types";
import {
  HandexInstance,
  HanjinInstance,
  LogenInstance,
  LotteInstance,
} from "../instance";
import Swal from "sweetalert2";
import { Dispatch, SetStateAction } from "react";

export const getInvoiceList = (
  invoice: number | null,
  setSearchList: Dispatch<SetStateAction<IWorkListData[]>>,
) => {
  const login = useRecoilValue(loginState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getInvoiceList",
      () =>
        LogenInstance.post("/lose", {
          api: "dvInAll",
          data: [
            {
              barcode: invoice,
              bran_cd: login.branchCode,
              longTime: "",
              tm_dv: "60",
              limit_count: 0,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "10") {
            Swal.fire({
              icon: "warning",
              title: "송장번호를 입력해주세요.",
              confirmButtonText: "확인",
            });
          } else if (data.result === "00" || data.result === "77") {
            setSearchList(data.data);

            Swal.fire({
              icon: "success",
              title: "조회가 완료되었습니다.",
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
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getInvoiceList",
      () =>
        LotteInstance.post("/lose", {
          api: "dvInAll",
          data: [
            {
              barcode: invoice,
              bran_cd: login.branchCode,
              longTime: "",
              tm_dv: "20",
              limit_count: 0,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "10") {
            Swal.fire({
              icon: "warning",
              title: "송장번호를 입력해주세요.",
              confirmButtonText: "확인",
            });
          } else if (data.result === "00" || data.result === "77") {
            setSearchList(data.data);

            Swal.fire({
              icon: "success",
              title: "조회가 완료되었습니다.",
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
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getInvoiceList",
      () =>
        HanjinInstance.post("/lose", {
          api: "dvInAll",
          data: [
            {
              barcode: invoice,
              bran_cd: login.branchCode,
              longTime: "",
              limit_count: 0,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "10") {
            Swal.fire({
              icon: "warning",
              title: "송장번호를 입력해주세요.",
              confirmButtonText: "확인",
            });
          } else if (data.result === "00" || data.result === "77") {
            setSearchList(data.data);

            Swal.fire({
              icon: "success",
              title: "조회가 완료되었습니다.",
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
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getInvoiceList",
      () =>
        HandexInstance.post("/lose", {
          api: "dvInAll",
          data: [
            {
              barcode: invoice,
              bran_cd: login.branchCode,
              longTime: "",
              limit_count: 0,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "10") {
            Swal.fire({
              icon: "warning",
              title: "송장번호를 입력해주세요.",
              confirmButtonText: "확인",
            });
          } else if (data.result === "00" || data.result === "77") {
            setSearchList(data.data);

            Swal.fire({
              icon: "success",
              title: "조회가 완료되었습니다.",
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

  return useMutation<IWorkListResponse, unknown, void, unknown>(
    "getInvoiceList",
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
