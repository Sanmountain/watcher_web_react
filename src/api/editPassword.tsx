import { useMutation } from "react-query";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { loginState } from "../stores/loginState";
import {
  HandexInstance,
  HanjinInstance,
  LogenInstance,
  LotteInstance,
} from "./instance";
import { workFilterState } from "../stores/work/workFilterState";
import { vassFilterState } from "../stores/vass/vassFilterState";
import { workListState } from "../stores/work/workListState";
import { vassListState } from "../stores/vass/vassListState";
import { nowVassDetailState } from "../stores/vass/nowVassDetailState";
import { prevVassDetailState } from "../stores/vass/prevVassDetailState";
import { IEditPasswordResponse } from "../types/editPassword.types";

export const editPassword = (userPassword: string) => {
  const [login, setLogin] = useRecoilState(loginState);
  const resetLogin = useResetRecoilState(loginState);
  const resetWorkFilter = useResetRecoilState(workFilterState);
  const resetVassFilter = useResetRecoilState(vassFilterState);
  const resetWorkList = useResetRecoilState(workListState);
  const resetVassList = useResetRecoilState(vassListState);
  const resetNowVassDetail = useResetRecoilState(nowVassDetailState);
  const resetPrevVassDetail = useResetRecoilState(prevVassDetailState);

  const navigate = useNavigate();

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<IEditPasswordResponse, unknown, void, unknown>(
      "editPassword",
      () =>
        LogenInstance.post("/watcher/sign", {
          api: "change",
          data: [
            {
              user_id: login.branchCode,
              user_password: userPassword,
              company: login.company,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            Swal.fire({
              icon: "success",
              title: "비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.",
              confirmButtonText: "확인",
            });
          }

          if (login.isUserIdStored) {
            setLogin({ ...login, isLogin: false, branchName: "", localIP: "" });
          } else {
            resetLogin();
          }
          resetWorkFilter();
          resetVassFilter();
          resetWorkList();
          resetVassList();
          resetNowVassDetail();
          resetPrevVassDetail();
          navigate("/login");
        },
        onError: (error) => {
          console.log(error);
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "비밀번호 변경 오류가 발생했습니다. 다시 시도해주세요",
            confirmButtonText: "확인",
          });
        },
      },
    );
  }
  // NOTE 롯데
  else if (login.company === "LOTTE") {
    return useMutation<IEditPasswordResponse, unknown, void, unknown>(
      "editPassword",
      () =>
        LotteInstance.post("/watcher/sign", {
          api: "change",
          data: [
            {
              user_id: login.branchCode,
              user_password: userPassword,
              company: login.company,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            Swal.fire({
              icon: "success",
              title: "비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.",
              confirmButtonText: "확인",
            });
          }

          if (login.isUserIdStored) {
            setLogin({ ...login, isLogin: false, branchName: "", localIP: "" });
          } else {
            resetLogin();
          }
          resetWorkFilter();
          resetVassFilter();
          resetWorkList();
          resetVassList();
          resetNowVassDetail();
          resetPrevVassDetail();
          navigate("/login");
        },
        onError: (error) => {
          console.log(error);
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "비밀번호 변경 오류가 발생했습니다. 다시 시도해주세요",
            confirmButtonText: "확인",
          });
        },
      },
    );
  }
  // NOTE 한진
  else if (login.company === "HANJIN") {
    return useMutation<IEditPasswordResponse, unknown, void, unknown>(
      "editPassword",
      () =>
        HanjinInstance.post("/watcher/sign", {
          api: "change",
          data: [
            {
              user_id: login.branchCode,
              user_password: userPassword,
              company: login.company,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            Swal.fire({
              icon: "success",
              title: "비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.",
              confirmButtonText: "확인",
            });
          }

          if (login.isUserIdStored) {
            setLogin({ ...login, isLogin: false, branchName: "", localIP: "" });
          } else {
            resetLogin();
          }
          resetWorkFilter();
          resetVassFilter();
          resetWorkList();
          resetVassList();
          resetNowVassDetail();
          resetPrevVassDetail();
          navigate("/login");
        },
        onError: (error) => {
          console.log(error);
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "비밀번호 변경 오류가 발생했습니다. 다시 시도해주세요",
            confirmButtonText: "확인",
          });
        },
      },
    );
  }
  // NOTE 한덱스
  else if (login.company === "HANDEX") {
    return useMutation<IEditPasswordResponse, unknown, void, unknown>(
      "editPassword",
      () =>
        HandexInstance.post("/watcher/sign", {
          api: "change",
          data: [
            {
              user_id: login.branchCode,
              user_password: userPassword,
              company: login.company,
            },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            Swal.fire({
              icon: "success",
              title: "비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.",
              confirmButtonText: "확인",
            });
          }

          if (login.isUserIdStored) {
            setLogin({ ...login, isLogin: false, branchName: "", localIP: "" });
          } else {
            resetLogin();
          }
          resetWorkFilter();
          resetVassFilter();
          resetWorkList();
          resetVassList();
          resetNowVassDetail();
          resetPrevVassDetail();
          navigate("/login");
        },
        onError: (error) => {
          console.log(error);
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "비밀번호 변경 오류가 발생했습니다. 다시 시도해주세요",
            confirmButtonText: "확인",
          });
        },
      },
    );
  }

  return useMutation<IEditPasswordResponse, unknown, void, unknown>(
    "editPassword",
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
