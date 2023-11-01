import { UseMutateFunction, useMutation } from "react-query";
import {
  HandexInstance,
  HanjinInstance,
  LogenInstance,
  LotteInstance,
} from "../instance";
import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import Swal from "sweetalert2";
import { Dispatch, SetStateAction } from "react";
import { ICheckedItems, IWorkListResponse } from "../../types/Work.types";

export const editTmDv = (
  checkItems: ICheckedItems[] | undefined,
  setCheckedItems: Dispatch<SetStateAction<ICheckedItems[]>> | undefined,
  changedTmDv: string,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  workDateListMutate: UseMutateFunction<
    IWorkListResponse,
    unknown,
    void,
    unknown
  >,
) => {
  const login = useRecoilValue(loginState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<any, unknown, void, unknown>(
      "editTmDv",
      () =>
        LogenInstance.post("/distinguish", {
          list: checkItems,
          tm_dv: changedTmDv,
          bran_cd: login.branchCode,
          company: login.company,
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            Swal.fire({
              icon: "success",
              title: "수정 완료되었습니다.",
              confirmButtonText: "확인",
            });
            workDateListMutate();

            if (setCheckedItems) {
              setCheckedItems([]);
            }
            setIsOpen(false);
          } else if (data.result === "fail") {
            Swal.fire({
              title: "Error!",
              icon: "error",
              text: "업무구분 수정에 실패했습니다. 다시 시도해주세요.",
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
    return useMutation<any, unknown, void, unknown>(
      "editTmDv",
      () =>
        LotteInstance.post("/distinguish", {
          list: checkItems,
          bran_cd: login.branchCode,
          company: login.company,
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            Swal.fire({
              icon: "success",
              title: "수정 완료되었습니다.",
              confirmButtonText: "확인",
            });
            workDateListMutate();

            if (setCheckedItems) {
              setCheckedItems([]);
            }
            setIsOpen(false);
          } else if (data.result === "fail") {
            Swal.fire({
              title: "Error!",
              icon: "error",
              text: "업무구분 수정에 실패했습니다. 다시 시도해주세요.",
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
    return useMutation<any, unknown, void, unknown>(
      "editTmDv",
      () =>
        HanjinInstance.post("/distinguish", {
          list: checkItems,
          bran_cd: login.branchCode,
          company: login.company,
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            Swal.fire({
              icon: "success",
              title: "수정 완료되었습니다.",
              confirmButtonText: "확인",
            });
            workDateListMutate();

            if (setCheckedItems) {
              setCheckedItems([]);
            }
            setIsOpen(false);
          } else if (data.result === "fail") {
            Swal.fire({
              title: "Error!",
              icon: "error",
              text: "업무구분 수정에 실패했습니다. 다시 시도해주세요.",
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
    return useMutation<any, unknown, void, unknown>(
      "editTmDv",
      () =>
        HandexInstance.post("/distinguish", {
          list: checkItems,
          bran_cd: login.branchCode,
          company: login.company,
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            Swal.fire({
              icon: "success",
              title: "수정 완료되었습니다.",
              confirmButtonText: "확인",
            });
            workDateListMutate();

            if (setCheckedItems) {
              setCheckedItems([]);
            }
            setIsOpen(false);
          } else if (data.result === "fail") {
            Swal.fire({
              title: "Error!",
              icon: "error",
              text: "업무구분 수정에 실패했습니다. 다시 시도해주세요.",
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

  return useMutation<any, unknown, void, unknown>(
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
