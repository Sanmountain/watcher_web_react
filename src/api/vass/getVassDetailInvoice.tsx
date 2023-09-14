import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { IWorkListResponse } from "../../types/Work.types";
import { instance } from "../instance";
import { useNavigate } from "react-router";
import { Dispatch, SetStateAction } from "react";
import { nowVassDetailState } from "../../stores/vass/nowVassDetailState";
import { prevVassDetailState } from "../../stores/vass/prevVassDetailState";
import { vassListState } from "../../stores/vass/vassListState";

export const getVassDetailInvoice = (
  searchInvoice: number | null,
  setRefetchList: Dispatch<SetStateAction<number>>,
) => {
  const login = useRecoilValue(loginState);
  const vassList = useRecoilValue(vassListState);
  const setNowVassDetail = useSetRecoilState(nowVassDetailState);
  const setPrevVassDetail = useSetRecoilState(prevVassDetailState);

  const navigate = useNavigate();

  return useMutation<IWorkListResponse, unknown, void, unknown>(
    "getVassDetailInvoice",
    () =>
      instance.post("/lose", {
        api: "dvInAll",
        data: [
          {
            barcode: searchInvoice,
            bran_cd: login.branchCode,
            longTime: "",
            tm_dv: "20",
            limit_count: 2,
          },
        ],
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          // NOTE refetch용
          setRefetchList((prev) => prev + 1);

          // NOTE nowVassDetail, prevVassDetail 바꿔주기
          const newNowVassDetail = vassList.find(
            (item) => Number(item.barcode) === searchInvoice,
          );

          if (newNowVassDetail) {
            setNowVassDetail(newNowVassDetail);
            const newNowVassDetailIndex = vassList.indexOf(newNowVassDetail);

            if (
              newNowVassDetailIndex !== -1 &&
              newNowVassDetailIndex < vassList.length - 1
            ) {
              const newPrevVassDetail = vassList[newNowVassDetailIndex + 1];
              setPrevVassDetail(newPrevVassDetail);
            }
          }

          navigate(`/vass/${searchInvoice}`);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
