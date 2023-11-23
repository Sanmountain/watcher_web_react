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
import { workFilterState } from "../../stores/work/workFilterState";
import { workListState } from "../../stores/work/workListState";
import Swal from "sweetalert2";

export const getWorkInvoiceList = () => {
  const login = useRecoilValue(loginState);
  const filterOption = useRecoilValue(workFilterState);
  const setWorkList = useSetRecoilState(workListState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getWorkInvoiceList",
      () =>
        LogenInstance.post("/lose", {
          api: "dvInAll",
          data: [
            {
              barcode: filterOption.invoiceNumber,
              bran_cd: login.branchCode,
              limit_count: 0,
              longTime: "",
              tm_dv: "60",
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
            setWorkList(data.data);

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
      "getWorkInvoiceList",
      () =>
        LotteInstance.post("/lose", {
          api: "dvInAll",
          data: [
            {
              barcode: filterOption.invoiceNumber,
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
            setWorkList(data.data);

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
      "getWorkInvoiceList",
      () =>
        HanjinInstance.post("/lose", {
          api: "dvInAll",
          data: [
            {
              barcode: filterOption.invoiceNumber,
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
            setWorkList(data.data);

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
      "getWorkInvoiceList",
      () =>
        HandexInstance.post("/lose", {
          api: "dvInAll",
          data: [
            {
              barcode: filterOption.invoiceNumber,
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
            setWorkList(data.data);

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
    "getWorkInvoiceList",
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
