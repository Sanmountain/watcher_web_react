import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { instance } from "../instance";
import { workFilterState } from "../../stores/work/workFilterState";
import {
  IRegisterModalStatusData,
  IRegisterModalStatusResponse,
  IRegisteredData,
} from "../../types/registerInvoice.types";
import { Dispatch, SetStateAction } from "react";

export const getRegisterModalStatus = (
  setRegisterInfo: Dispatch<SetStateAction<IRegisterModalStatusData>>,
  setRegisteredData: Dispatch<SetStateAction<IRegisteredData>>,
) => {
  const login = useRecoilValue(loginState);
  const filterOption = useRecoilValue(workFilterState);

  return useMutation<IRegisterModalStatusResponse, unknown, void, unknown>(
    "getRegisterModalStatus",
    () =>
      instance.post("/watcher/status", {
        api: "status",
        data: [
          {
            bran_cd: login.branchCode,
            scandate: filterOption.date,
          },
        ],
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setRegisterInfo(data.data[0]);

          let setData = {
            tm_dv: "",
            scandate: "",
            bran_cd: "",
            car_num: "",
            emp_cd: "",
            tg_bran_cd: "",
            pob: "",
            barcode: "",
          };

          if (!data.data[0]) {
            setData = {
              tm_dv: filterOption.receivingShipment === "receive" ? "21" : "20",
              scandate: filterOption.date,
              bran_cd: login.branchCode,
              car_num: "",
              emp_cd: "",
              tg_bran_cd: "",
              pob: "",
              barcode: "",
            };
          } else if (filterOption.receivingShipment === "receive") {
            const filteredData = data.data.filter(
              (item) => item.tm_dv === "21",
            )[0] || {
              tm_dv: "",
              scandate: "",
              bran_cd: "",
              car_num: "",
              emp_cd: "",
              tg_bran_cd: "",
              pob: "",
              barcode: "",
            };

            setData = {
              tm_dv: filteredData.tm_dv,
              scandate: filteredData.scandate,
              bran_cd: filteredData.bran_cd,
              car_num: filteredData.car_num
                ? filteredData.car_num.split(",")[0]
                : "",
              emp_cd: filteredData.emp_cd
                ? filteredData.emp_cd.split(",")[0]
                : "",
              tg_bran_cd: filteredData.tg_bran_cd
                ? filteredData.tg_bran_cd.split(",")[0]
                : "",
              pob: filteredData.pob ? filteredData.pob.split(",")[0] : "",
              barcode: "",
            };
          } else if (filterOption.receivingShipment === "shipment") {
            const filteredData = data.data.filter(
              (item) => item.tm_dv === "20",
            )[0] || {
              tm_dv: "",
              scandate: "",
              bran_cd: "",
              car_num: "",
              emp_cd: "",
              tg_bran_cd: "",
              pob: "",
              barcode: "",
            };

            setData = {
              tm_dv: filteredData.tm_dv,
              scandate: filteredData.scandate,
              bran_cd: filteredData.bran_cd,
              car_num: filteredData.car_num
                ? filteredData.car_num.split(",")[0]
                : "",
              emp_cd: filteredData.emp_cd
                ? filteredData.emp_cd.split(",")[0]
                : "",
              tg_bran_cd: filteredData.tg_bran_cd
                ? filteredData.tg_bran_cd.split(",")[0]
                : "",
              pob: filteredData.pob ? filteredData.pob.split(",")[0] : "",
              barcode: "",
            };
          }

          setRegisteredData(setData);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
