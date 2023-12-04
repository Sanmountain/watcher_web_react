import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { IWorkListData, IWorkListResponse } from "../../types/Work.types";
import {
  HandexInstance,
  HanjinInstance,
  LogenInstance,
  LotteInstance,
} from "../instance";
import Swal from "sweetalert2";
import { Dispatch, SetStateAction } from "react";

export const getDateList = (
  date: { select: string; date: string },
  setSearchList: Dispatch<SetStateAction<IWorkListData[]>>,
) => {
  const login = useRecoilValue(loginState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getDateList",
      () =>
        LogenInstance.post("/lose", {
          api: "dvInAll",
          data: [
            {
              start_time: `${date.date} 00:00:00`,
              end_time: `${date.date} 23:59:59`,
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
            if (date.select === "receive") {
              filteringData = data.data.filter((item) => item.tm_dv === "60");
            }
            // NOTE 발송
            else if (date.select === "shipment") {
              filteringData = data.data.filter((item) => item.tm_dv === "30");
            }
            // NOTE 전체
            else if (date.select === "all") {
              filteringData = data.data.filter(
                (item) => item.tm_dv === "30" || item.tm_dv === "60",
              );
            }

            setSearchList(filteringData);

            Swal.fire({
              icon: "success",
              title: "조회가 완료되었습니다.",
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
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getDateList",
      () =>
        LotteInstance.post("/lose", {
          api: "dvInAll",
          data: [
            {
              start_time: `${date.date} 00:00:00`,
              end_time: `${date.date} 23:59:59`,
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
            if (date.select === "receive") {
              filteringData = data.data.filter((item) => item.tm_dv === "60");
            }
            // NOTE 발송
            else if (date.select === "shipment") {
              filteringData = data.data.filter((item) => item.tm_dv === "30");
            }
            // NOTE 전체
            else if (date.select === "all") {
              filteringData = data.data.filter(
                (item) => item.tm_dv === "30" || item.tm_dv === "60",
              );
            }

            setSearchList(filteringData);

            Swal.fire({
              icon: "success",
              title: "조회가 완료되었습니다.",
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
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getDateList",
      () =>
        HanjinInstance.post("/lose", {
          api: "dvInAll",
          data: [
            {
              start_time: `${date.date} 00:00:00`,
              end_time: `${date.date} 23:59:59`,
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
            if (date.select === "receive") {
              filteringData = data.data.filter((item) => item.tm_dv === "60");
            }
            // NOTE 발송
            else if (date.select === "shipment") {
              filteringData = data.data.filter((item) => item.tm_dv === "30");
            }
            // NOTE 전체
            else if (date.select === "all") {
              filteringData = data.data.filter(
                (item) => item.tm_dv === "30" || item.tm_dv === "60",
              );
            }

            setSearchList(filteringData);

            Swal.fire({
              icon: "success",
              title: "조회가 완료되었습니다.",
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
    return useMutation<IWorkListResponse, unknown, void, unknown>(
      "getDateList",
      () =>
        HandexInstance.post("/lose", {
          api: "dvInAll",
          data: [
            {
              start_time: `${date.date} 00:00:00`,
              end_time: `${date.date} 23:59:59`,
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
            if (date.select === "receive") {
              filteringData = data.data.filter((item) => item.tm_dv === "60");
            }
            // NOTE 발송
            else if (date.select === "shipment") {
              filteringData = data.data.filter((item) => item.tm_dv === "30");
            }
            // NOTE 전체
            else if (date.select === "all") {
              filteringData = data.data.filter(
                (item) => item.tm_dv === "30" || item.tm_dv === "60",
              );
            }

            setSearchList(filteringData);

            Swal.fire({
              icon: "success",
              title: "조회가 완료되었습니다.",
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

  return useMutation<IWorkListResponse, unknown, void, unknown>(
    "getDateList",
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
