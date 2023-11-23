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
import Swal from "sweetalert2";

export const getWorkDateList = (isTmDvModal?: boolean) => {
  const login = useRecoilValue(loginState);
  const filterOption = useRecoilValue(workFilterState);
  const setWorkList = useSetRecoilState(workListState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "useGetWorkDateList",
      () =>
        LogenInstance.post("/lose", {
          api: "dvInAll",
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
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00" || data.result === "77") {
            let filteringData: any;

            // NOTE 배송입고
            if (filterOption.receivingShipment === "receive") {
              filteringData = data.data.filter((item) => item.tm_dv === "60");
            }
            // NOTE 집하출고
            else if (filterOption.receivingShipment === "shipment") {
              filteringData = data.data.filter((item) => item.tm_dv === "30");
            }
            // NOTE 전체
            else if (filterOption.receivingShipment === "all") {
              filteringData = data.data.filter(
                (item) => item.tm_dv === "30" || item.tm_dv === "60",
              );
            }

            setWorkList(filteringData);

            if (!isTmDvModal) {
              Swal.fire({
                icon: "success",
                title: "조회가 완료되었습니다.",
                confirmButtonText: "확인",
              });
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
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getWorkDateList",
      () =>
        LotteInstance.post("/lose", {
          api: "dvInAll",
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
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00" || data.result === "77") {
            let filteringData: any;

            // NOTE 도착
            if (filterOption.receivingShipment === "receive") {
              filteringData = data.data.filter((item) => item.tm_dv === "21");
            }
            // NOTE 발송
            else if (filterOption.receivingShipment === "shipment") {
              filteringData = data.data.filter((item) => item.tm_dv === "20");
            }
            // NOTE 전체
            else if (filterOption.receivingShipment === "all") {
              filteringData = data.data.filter(
                (item) => item.tm_dv === "20" || item.tm_dv === "21",
              );
            }

            setWorkList(filteringData);

            if (!isTmDvModal) {
              Swal.fire({
                icon: "success",
                title: "조회가 완료되었습니다.",
                confirmButtonText: "확인",
              });
            }
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
      "getWorkDateList",
      () =>
        HanjinInstance.post("/lose", {
          api: "dvInAll",
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
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00" || data.result === "77") {
            let filteringData: any;

            // NOTE 간선상차
            if (filterOption.receivingShipment === "receive") {
              filteringData = data.data.filter((item) => item.tm_dv === "31");
            }
            // NOTE 간선하차
            else if (filterOption.receivingShipment === "shipment") {
              filteringData = data.data.filter((item) => item.tm_dv === "32");
            }
            // NOTE 전체
            else if (filterOption.receivingShipment === "all") {
              filteringData = data.data.filter(
                (item) => item.tm_dv === "31" || item.tm_dv === "32",
              );
            }

            setWorkList(filteringData);

            if (!isTmDvModal) {
              Swal.fire({
                icon: "success",
                title: "조회가 완료되었습니다.",
                confirmButtonText: "확인",
              });
            }
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
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getWorkDateList",
      () =>
        HandexInstance.post("/lose", {
          api: "dvInAll",
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
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00" || data.result === "77") {
            let filteringData: any;

            // NOTE 영업소상차
            if (filterOption.receivingShipment === "receive") {
              filteringData = data.data.filter((item) => item.tm_dv === "15");
            }
            // NOTE 영업소하차
            else if (filterOption.receivingShipment === "shipment") {
              filteringData = data.data.filter((item) => item.tm_dv === "50");
            }
            // NOTE 상품집하
            else if (filterOption.receivingShipment === "goods") {
              filteringData = data.data.filter((item) => item.tm_dv === "10");
            }
            // NOTE 전체
            else if (filterOption.receivingShipment === "all") {
              filteringData = data.data.filter(
                (item) =>
                  item.tm_dv === "15" ||
                  item.tm_dv === "50" ||
                  item.tm_dv === "10",
              );
            }

            setWorkList(filteringData);

            if (!isTmDvModal) {
              Swal.fire({
                icon: "success",
                title: "조회가 완료되었습니다.",
                confirmButtonText: "확인",
              });
            }
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }

  return useMutation<IWorkListResponse, unknown, void, unknown>(
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
