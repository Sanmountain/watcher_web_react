import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { IWorkListData, IWorkListResponse } from "../../types/Work.types";
import { HanjinInstance, LogenInstance, LotteInstance } from "../instance";
import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";

export const getAmount = (
  setShipmentCount: Dispatch<SetStateAction<IWorkListData[]>>,
  setReceiveCount: Dispatch<SetStateAction<IWorkListData[]>>,
) => {
  const login = useRecoilValue(loginState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getAmount",
      () =>
        LogenInstance.post("/lose", {
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
              (item) => item.tm_dv === "30",
            );
            setShipmentCount(filteringShipmentData);

            const filteringReceiveData = data.data.filter(
              (item) => item.tm_dv === "60",
            );
            setReceiveCount(filteringReceiveData);
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
      "getAmount",
      () =>
        LotteInstance.post("/lose", {
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
  }
  // NOTE 한진
  else if (login.company === "HANJIN") {
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getAmount",
      () =>
        HanjinInstance.post("/lose", {
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
              (item) => item.tm_dv === "32",
            );
            setShipmentCount(filteringShipmentData);

            const filteringReceiveData = data.data.filter(
              (item) => item.tm_dv === "31",
            );
            setReceiveCount(filteringReceiveData);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }
};
