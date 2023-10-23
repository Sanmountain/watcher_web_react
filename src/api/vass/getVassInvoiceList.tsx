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
import Swal from "sweetalert2";
import { vassFilterState } from "../../stores/vass/vassFilterState";
import { vassListState } from "../../stores/vass/vassListState";

export const getVassInvoiceList = () => {
  const login = useRecoilValue(loginState);
  const filterOption = useRecoilValue(vassFilterState);
  const setWorkList = useSetRecoilState(vassListState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getVassInvoiceList",
      () =>
        LogenInstance.post("/lose", {
          api: "dvInAll",
          data: [
            {
              barcode: filterOption.invoiceNumber,
              bran_cd: login.branchCode,
              longTime: "",
              tm_dv: "60",
              limit_count: 2,
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
          } else if (data.result === "00") {
            setWorkList(data.data);

            Swal.fire({
              icon: "success",
              title: "조회 성공",
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
      "getVassInvoiceList",
      () =>
        LotteInstance.post("/lose", {
          api: "dvInAll",
          data: [
            {
              barcode: filterOption.invoiceNumber,
              bran_cd: login.branchCode,
              longTime: "",
              tm_dv: "20",
              limit_count: 2,
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
          } else if (data.result === "00") {
            setWorkList(data.data);

            Swal.fire({
              icon: "success",
              title: "조회 성공",
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
      "getVassInvoiceList",
      () =>
        HanjinInstance.post("/lose", {
          api: "dvInAll",
          data: [
            {
              barcode: filterOption.invoiceNumber,
              bran_cd: login.branchCode,
              longTime: "",
              limit_count: 2,
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
          } else if (data.result === "00") {
            setWorkList(data.data);

            Swal.fire({
              icon: "success",
              title: "조회 성공",
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
      "getVassInvoiceList",
      () =>
        HandexInstance.post("/lose", {
          api: "dvInAll",
          data: [
            {
              barcode: filterOption.invoiceNumber,
              bran_cd: login.branchCode,
              longTime: "",
              limit_count: 2,
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
          } else if (data.result === "00") {
            setWorkList(data.data);

            Swal.fire({
              icon: "success",
              title: "조회 성공",
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
    "getVassInvoiceList",
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
