import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { instance } from "../instance";
import { Dispatch, SetStateAction } from "react";
import {
  IWeekChartData,
  IWeekChartResponse,
} from "../../types/weekChart.types";
import { weekTotalState } from "../../stores/dashboard/weekTotalState";

export const getWeekChart = (
  setWeekData: Dispatch<SetStateAction<IWeekChartData[]>>,
) => {
  const login = useRecoilValue(loginState);
  const setWeekTotal = useSetRecoilState(weekTotalState);

  return useMutation<IWeekChartResponse, unknown, void, unknown>(
    "getWeekChart",
    () =>
      instance.post("/boardTotal", {
        api: "week",
        data: [
          {
            bran_cd: login.branchCode,
          },
        ],
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setWeekData(data.data);

          const totalSum = data.data.reduce(
            (acc, item) => acc + parseInt(item.count, 10),
            0,
          );
          setWeekTotal(totalSum);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
