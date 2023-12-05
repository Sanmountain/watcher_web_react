import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { IVassTrackingDataResponse } from "../../types/vassTracking.types";
import { LogenInstance } from "../instance";
import { vassTrackingState } from "../../stores/vass/vassTrackingState";
import { prevVassDetailState } from "../../stores/vass/prevVassDetailState";

export const getVassTracking = () => {
  const login = useRecoilValue(loginState);
  const setVassTrackingList = useSetRecoilState(vassTrackingState);
  const prevVassDetail = useRecoilValue(prevVassDetailState);

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IVassTrackingDataResponse, unknown, void, unknown>(
      "getVassTracking",
      () =>
        LogenInstance.post("/tracking", {
          api: "info",
          data: [
            {
              barcode: prevVassDetail?.barcode,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            setVassTrackingList(data.data);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }

  return useMutation<IVassTrackingDataResponse, unknown, void, unknown>(
    "getVassTracking",
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
