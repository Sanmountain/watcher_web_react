import { useRecoilValue } from "recoil";
import { useMutation } from "react-query";
import { LogenInstance } from "../instance";
import { Dispatch, SetStateAction } from "react";
import { loginState } from "../../stores/loginState";
import { IAutoChangeResponse } from "../../types/autoChange.types";

export const getAutoChange = (
  isOn: boolean,
  setIsOn: Dispatch<SetStateAction<boolean>>,
) => {
  const login = useRecoilValue(loginState);

  if (login.company === "LOGEN") {
    return useMutation<IAutoChangeResponse, unknown, void, unknown>(
      "getAutoChange",
      (auto) =>
        LogenInstance.post("/autoChange", {
          bran_cd: login.branchCode,
          auto,
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            setIsOn(!isOn);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }

  return useMutation<IAutoChangeResponse, unknown, void, unknown>(
    "getAutoChange",
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
