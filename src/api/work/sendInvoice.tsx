import { useMutation } from "react-query";
import { instance } from "../instance";
import { IRegisterInvoiceResponse } from "../../types/registerInvoice.types";
import { useRecoilValue } from "recoil";
import { workFilterState } from "../../stores/work/workFilterState";
import { loginState } from "../../stores/loginState";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export const sendInvoice = () => {
  const filterOption = useRecoilValue(workFilterState);
  const login = useRecoilValue(loginState);

  return useMutation<IRegisterInvoiceResponse, unknown, void, unknown>(
    "sendInvoice",
    () =>
      instance.post("/send", {
        api: "sendSelect",
        data: [
          {
            bran_cd: login.userId,
            start_time: `${dayjs(filterOption.date).format(
              "YYYY-MM-DD",
            )} 00:00:00`,
            end_time: `${dayjs(filterOption.date).format(
              "YYYY-MM-DD",
            )} 23:59:59`,
            longTime: "",
          },
        ],
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          // NOTE fail난 경우 fail 사유 띄우기
          if (data.data[0].fail_list.length > 0) {
            Swal.fire({
              title: "Error!",
              icon: "error",
              text: `${data.data[0].fail_list[0]}`,
              confirmButtonText: "확인",
            });
          } else
            Swal.fire({
              icon: "success",
              title: "전송완료",
              confirmButtonText: "확인",
            });
        } else {
          Swal.fire({
            icon: "warning",
            title: "통신오류",
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
