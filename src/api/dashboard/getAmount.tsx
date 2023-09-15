import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { IWorkListData, IWorkListResponse } from "../../types/Work.types";
import { instance } from "../instance";
import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";

export const getAmount = (
  setShipmentCount: Dispatch<SetStateAction<IWorkListData[]>>,
  setReceiveCount: Dispatch<SetStateAction<IWorkListData[]>>,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IWorkListResponse, unknown, void, unknown>(
    "getAmount",
    () =>
      instance.post("/lose", {
        api: "dvInAll",
        data: [
          {
            start_time: `${dayjs().format("YYYY-MM-DD")} 00:00:00`,
            end_time: `${dayjs().format("YYYY-MM-DD")} 23:59:59`,
            bran_cd: login.branchCode,
            longTime: "",
          },
        ],
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          const filteringShipmentData = data.data.filter(
            (item) => item.tm_dv === "20",
          );
          setShipmentCount(filteringShipmentData);

          const filteringReceiveData = data.data.filter(
            (item) => item.tm_dv === "21",
          );
          setReceiveCount(filteringReceiveData);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
