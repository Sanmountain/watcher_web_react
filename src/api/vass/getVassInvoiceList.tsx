import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { IWorkListResponse } from "../../types/Work.types";
import { instance } from "../instance";
import Swal from "sweetalert2";
import { vassFilterState } from "../../stores/vass/vassFilterState";
import { vassListState } from "../../stores/vass/vassListState";

export const getVassInvoiceList = () => {
  const login = useRecoilValue(loginState);
  const filterOption = useRecoilValue(vassFilterState);
  const setWorkList = useSetRecoilState(vassListState);

  return useMutation<IWorkListResponse, unknown, void, unknown>(
    "getVassInvoiceList",
    () =>
      instance.post("/lose", {
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
};
