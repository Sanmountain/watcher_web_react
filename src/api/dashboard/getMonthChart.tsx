import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { instance } from "../instance";
import { Dispatch, SetStateAction } from "react";
import {
  IWeekChartData,
  IWeekChartResponse,
} from "../../types/weekChart.types";
import { monthTotalState } from "../../stores/dashboard/monthTotalState";

export const getMonthChart = (
  setMonthData: Dispatch<SetStateAction<IWeekChartData[]>>,
) => {
  const login = useRecoilValue(loginState);
  const setMonthTotal = useSetRecoilState(monthTotalState);

  return useMutation<IWeekChartResponse, unknown, void, unknown>(
    "getMonthChart",
    () =>
      instance.post("/boardTotal", {
        api: "month",
        data: [
          {
            bran_cd: login.branchCode,
          },
        ],
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setMonthData(data.data);

          const totalSum = data.data.reduce(
            (acc, item) => acc + parseInt(item.count, 10),
            0,
          );
          setMonthTotal(totalSum);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
