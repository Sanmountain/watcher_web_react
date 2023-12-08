import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { IWorkListResponse } from "../../types/Work.types";
import {
  HandexInstance,
  HanjinInstance,
  LogenInstance,
  LotteInstance,
} from "../instance";
import { workFilterState } from "../../stores/work/workFilterState";
import dayjs from "dayjs";
import { workListState } from "../../stores/work/workListState";
import { workLastPageState } from "../../stores/work/workPageState";
import { workListTotalState } from "../../stores/work/workListTotalState";

export const getWorkDateList = () => {
  const login = useRecoilValue(loginState);
  const filterOption = useRecoilValue(workFilterState);
  const setWorkList = useSetRecoilState(workListState);
  const setWorkLastPage = useSetRecoilState(workLastPageState);
  const setTotal = useSetRecoilState(workListTotalState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IWorkListResponse, unknown, string, unknown>(
      "useGetWorkDateList",
      (page: string) =>
        LogenInstance.post("/dvInAllPaging", {
          api: "dvInAllPaging",
          data: [
            {
              start_time: `${dayjs(filterOption.date).format(
                "YYYY-MM-DD",
              )} 00:00:00`,
              end_time: `${dayjs(filterOption.date).format(
                "YYYY-MM-DD",
              )} 23:59:59`,
              bran_cd: login.branchCode,
              longTime: "",
              page,
              size: "30",
              tm_dv:
                filterOption.receivingShipment === "all"
                  ? ""
                  : filterOption.receivingShipment === "receive"
                    ? "60"
                    : "30",
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00" || data.result === "77") {
            // NOTE 배송입고
            if (filterOption.receivingShipment === "receive") {
              if (setTotal) setTotal(Number(data.deliveryInTotal));
              setWorkLastPage(data.deliveryInLastPage);
            }
            // NOTE 집하출고
            else if (filterOption.receivingShipment === "shipment") {
              if (setTotal) setTotal(Number(data.deliveryOutTotal));
              setWorkLastPage(data.deliveryOutLastPage);
            }
            // NOTE 전체
            else if (filterOption.receivingShipment === "all") {
              if (setTotal) setTotal(Number(data.total));
              setWorkLastPage(data.lastPage);
            }

            setWorkList((current) => [...current, ...data.data]);
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
    return useMutation<IWorkListResponse, unknown, string, unknown>(
      "getWorkDateList",
      (page: string) =>
        LotteInstance.post("/dvInAllPaging", {
          api: "dvInAllPaging",
          data: [
            {
              start_time: `${dayjs(filterOption.date).format(
                "YYYY-MM-DD",
              )} 00:00:00`,
              end_time: `${dayjs(filterOption.date).format(
                "YYYY-MM-DD",
              )} 23:59:59`,
              bran_cd: login.branchCode,
              longTime: "",
              page,
              size: "30",
              tm_dv:
                filterOption.receivingShipment === "all"
                  ? ""
                  : filterOption.receivingShipment === "receive"
                    ? "21"
                    : "20",
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00" || data.result === "77") {
            // NOTE 도착
            if (filterOption.receivingShipment === "receive") {
              if (setTotal) setTotal(Number(data.deliveryInTotal));
              setWorkLastPage(data.deliveryInLastPage);
            }
            // NOTE 발송
            else if (filterOption.receivingShipment === "shipment") {
              if (setTotal) setTotal(Number(data.deliveryOutTotal));
              setWorkLastPage(data.deliveryOutLastPage);
            }
            // NOTE 전체
            else if (filterOption.receivingShipment === "all") {
              if (setTotal) setTotal(Number(data.total));
              setWorkLastPage(data.lastPage);
            }

            setWorkList((current) => [...current, ...data.data]);
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
    return useMutation<IWorkListResponse, unknown, string, unknown>(
      "getWorkDateList",
      (page: string) =>
        HanjinInstance.post("/dvInAllPaging", {
          api: "dvInAllPaging",
          data: [
            {
              start_time: `${dayjs(filterOption.date).format(
                "YYYY-MM-DD",
              )} 00:00:00`,
              end_time: `${dayjs(filterOption.date).format(
                "YYYY-MM-DD",
              )} 23:59:59`,
              bran_cd: login.branchCode,
              longTime: "",
              page,
              size: "30",
              tm_dv:
                filterOption.receivingShipment === "all"
                  ? ""
                  : filterOption.receivingShipment === "receive"
                    ? "31"
                    : "32",
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00" || data.result === "77") {
            // NOTE 간선상차
            if (filterOption.receivingShipment === "receive") {
              if (setTotal) setTotal(Number(data.deliveryInTotal));
              setWorkLastPage(data.deliveryInLastPage);
            }
            // NOTE 간선하차
            else if (filterOption.receivingShipment === "shipment") {
              if (setTotal) setTotal(Number(data.deliveryOutTotal));
              setWorkLastPage(data.deliveryOutLastPage);
            }
            // NOTE 전체
            else if (filterOption.receivingShipment === "all") {
              if (setTotal) setTotal(Number(data.total));
              setWorkLastPage(data.lastPage);
            }

            setWorkList((current) => [...current, ...data.data]);
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
    return useMutation<IWorkListResponse, unknown, string, unknown>(
      "getWorkDateList",
      (page: string) =>
        HandexInstance.post("/dvInAllPaging", {
          api: "dvInAllPaging",
          data: [
            {
              start_time: `${dayjs(filterOption.date).format(
                "YYYY-MM-DD",
              )} 00:00:00`,
              end_time: `${dayjs(filterOption.date).format(
                "YYYY-MM-DD",
              )} 23:59:59`,
              bran_cd: login.branchCode,
              longTime: "",
              page,
              size: "30",
              tm_dv:
                filterOption.receivingShipment === "all"
                  ? ""
                  : filterOption.receivingShipment === "receive"
                    ? "15"
                    : filterOption.receivingShipment === "shipment"
                      ? "50"
                      : "10",
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00" || data.result === "77") {
            // NOTE 영업소상차
            if (filterOption.receivingShipment === "receive") {
              if (setTotal) setTotal(Number(data.deliveryInTotal));
              setWorkLastPage(data.deliveryInLastPage);
            }
            // NOTE 영업소하차
            else if (filterOption.receivingShipment === "shipment") {
              if (setTotal) setTotal(Number(data.deliveryOutTotal));
              setWorkLastPage(data.deliveryOutLastPage);
            }
            // NOTE 상품집하
            else if (filterOption.receivingShipment === "goods") {
              if (setTotal)
                setTotal(
                  Number(data.total) -
                    Number(data.deliveryInTotal) -
                    Number(data.deliveryOutTotal),
                );
              setWorkLastPage(
                (
                  Number(data.lastPage) -
                  Number(data.deliveryInLastPage) -
                  Number(data.deliveryOutLastPage)
                ).toString(),
              );
            }
            // NOTE 전체
            else if (filterOption.receivingShipment === "all") {
              if (setTotal) setTotal(Number(data.total));
              setWorkLastPage(data.lastPage);
            }

            setWorkList((current) => [...current, ...data.data]);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }

  return useMutation<IWorkListResponse, unknown, string, unknown>(
    "getWorkDateList",
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
