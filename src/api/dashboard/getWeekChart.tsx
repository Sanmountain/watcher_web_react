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
import { weekTotalState } from "../../stores/dashboard/weekTotalState";

export const getWeekChart = (
  setWeekData: Dispatch<SetStateAction<IWeekChartData[]>>,
) => {
  const login = useRecoilValue(loginState);
  const setWeekTotal = useSetRecoilState(weekTotalState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IWeekChartResponse, unknown, void, unknown>(
      "getWeekChart",
      () =>
        LogenInstance.post("/boardTotal", {
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
  }
  // NOTE 롯데
  else if (login.company === "LOTTE") {
    return useMutation<IWeekChartResponse, unknown, void, unknown>(
      "getWeekChart",
      () =>
        LotteInstance.post("/boardTotal", {
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
  }
  // NOTE 한진
  else if (login.company === "HANJIN") {
    return useMutation<IWeekChartResponse, unknown, void, unknown>(
      "getWeekChart",
      () =>
        HanjinInstance.post("/boardTotal", {
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
  }
  // NOTE 한덱스
  else if (login.company === "HANDEX") {
    return useMutation<IWeekChartResponse, unknown, void, unknown>(
      "getWeekChart",
      () =>
        HandexInstance.post("/boardTotal", {
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
  }

  return useMutation<IWeekChartResponse, unknown, void, unknown>(
    "getWeekChart",
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
