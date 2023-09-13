import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { IWorkListResponse } from "../../types/Work.types";
import { instance } from "../instance";
import dayjs from "dayjs";
import { vassFilterState } from "../../stores/vass/vassFilterState";
import { vassListState } from "../../stores/vass/vassListState";
import Swal from "sweetalert2";

export const getVassDateList = () => {
  const login = useRecoilValue(loginState);
  const filterOption = useRecoilValue(vassFilterState);
  const setWorkList = useSetRecoilState(vassListState);

  return useMutation<IWorkListResponse, unknown, void, unknown>(
    "getVassDateList",
    () =>
      instance.post("/lose", {
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
        if (data.result === "00") {
          let filteringData: any;

          // NOTE 도착
          if (filterOption.receivingShipment === "receive") {
            filteringData = data.data.filter((item) => item.tm_dv === "21");
          }
          // NOTE 발송
          else if (filterOption.receivingShipment === "shipment") {
            filteringData = data.data.filter((item) => item.tm_dv === "20");
          }

          setWorkList(filteringData);
          Swal.fire({
            icon: "success",
            title: "조회 성공",
            confirmButtonText: "확인",
          });
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
