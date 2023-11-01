import { useMutation } from "react-query";
import { LogenInstance, LotteInstance } from "../instance";
import { IRegisterInvoiceResponse } from "../../types/registerInvoice.types";
import { useRecoilValue } from "recoil";
import { workFilterState } from "../../stores/work/workFilterState";
import { loginState } from "../../stores/loginState";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { Dispatch, SetStateAction } from "react";

export const sendInvoice = (
  isTmDvModal?: boolean,
  setIsOpen?: Dispatch<SetStateAction<boolean>>,
) => {
  const filterOption = useRecoilValue(workFilterState);
  const login = useRecoilValue(loginState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IRegisterInvoiceResponse, unknown, void, unknown>(
      "sendInvoice",
      () =>
        LogenInstance.post("/send", {
          api: "sendSelect",
          data: [
            {
              bran_cd: login.branchCode,
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
            if (!isTmDvModal) {
              Swal.fire({
                icon: "success",
                title: "전송완료",
                confirmButtonText: "확인",
              });
            }

            // NOTE TmDv 모달에서 전송될 경우
            if (isTmDvModal && setIsOpen) {
              Swal.fire({
                icon: "success",
                title: "수정 완료되었습니다.",
                confirmButtonText: "확인",
              });
              setIsOpen(false);
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
    return useMutation<IRegisterInvoiceResponse, unknown, void, unknown>(
      "sendInvoice",
      () =>
        LotteInstance.post("/send", {
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
            } else {
              if (!isTmDvModal) {
                Swal.fire({
                  icon: "success",
                  title: "전송완료",
                  confirmButtonText: "확인",
                });
              }
              // NOTE TmDv 모달에서 전송될 경우
              if (isTmDvModal && setIsOpen) {
                Swal.fire({
                  icon: "success",
                  title: "수정 완료되었습니다.",
                  confirmButtonText: "확인",
                });
                setIsOpen(false);
              }
            }
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }

  return useMutation<IRegisterInvoiceResponse, unknown, void, unknown>(
    "sendInvoice",
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
