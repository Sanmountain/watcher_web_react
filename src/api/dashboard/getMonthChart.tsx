import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import {
  HandexInstance,
  HanjinInstance,
  LogenInstance,
  LotteInstance,
} from "../instance";
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

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IWeekChartResponse, unknown, void, unknown>(
      "getMonthChart",
      () =>
        LogenInstance.post("/boardTotal", {
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
  }
  // NOTE 롯데
  else if (login.company === "LOTTE") {
    return useMutation<IWeekChartResponse, unknown, void, unknown>(
      "getMonthChart",
      () =>
        LotteInstance.post("/boardTotal", {
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
  }
  // NOTE 한진
  else if (login.company === "HANJIN") {
    return useMutation<IWeekChartResponse, unknown, void, unknown>(
      "getMonthChart",
      () =>
        HanjinInstance.post("/boardTotal", {
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
  }
  // NOTE 한덱스
  else if (login.company === "HANDEX") {
    return useMutation<IWeekChartResponse, unknown, void, unknown>(
      "getMonthChart",
      () =>
        HandexInstance.post("/boardTotal", {
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
  }

  return useMutation<IWeekChartResponse, unknown, void, unknown>(
    "getMonthChart",
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
