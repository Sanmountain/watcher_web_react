import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { LogenInstance } from "../instance";
import { Dispatch, SetStateAction } from "react";
import { IAutoCheckResponse } from "../../types/autoCheck.types";

export const getAutoCheck = (setIsOn: Dispatch<SetStateAction<boolean>>) => {
  const login = useRecoilValue(loginState);

  if (login.company === "LOGEN") {
    return useMutation<IAutoCheckResponse, unknown, void, unknown>(
      "getAutoCheck",
      () =>
        LogenInstance.post("/autoCheck", {
          bran_cd: login.branchCode,
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00" || data.result === "77") {
            const autoValue = data.data[0].auto;

            if (autoValue === "1") {
              setIsOn(true);
            } else setIsOn(false);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }

  return useMutation<IAutoCheckResponse, unknown, void, unknown>(
    "getAutoCheck",
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
