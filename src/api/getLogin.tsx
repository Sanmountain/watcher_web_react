import { useMutation, useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { ILoginResponse } from "../types/Login.types";
import { loginState } from "../stores/loginState";
import { HanjinInstance, LogenInstance, LotteInstance } from "./instance";
import axios from "axios";

export const useLocalIP = () => {
  const [login, setLogin] = useRecoilState(loginState);

  useQuery(
    "localIP",
    async () => {
      const { data } = await axios.get("https://ipapi.co/json/");
      setLogin({
        ...login,
        localIP: data.ip,
      });
    },
    {
      enabled: !login.localIP, // IP가 이미 설정되어 있지 않으면 실행
    },
  );
};

export const getLogin = (userId: string, userPassword: string) => {
  const [login, setLogin] = useRecoilState(loginState);

  const navigate = useNavigate();

  useLocalIP();

  // NOTE 로젠
  if (login.company === "LOGEN") {
    return useMutation<ILoginResponse, unknown, void, unknown>(
      "getLogin",
      () =>
        LogenInstance.post("/watcher/sign", {
          api: "signIn",
          data: [{ user_id: userId, user_password: userPassword }],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            setLogin({
              ...login,
              isLogin: true,
              userId: data.data[0].user_id,
              branchName: data.data[0].bran_exp,
              branchCode: data.data[0].bran_cd,
              saId: data.data[0].sa_id,
              accountId: data.data[0].account_id,
              camUsable: data.data[0].cam_usable,
            });

            navigate("/dashboard");
          }
          // NOTE 비밀번호 불일치
          else if (data.result === "08") {
            Swal.fire({
              icon: "warning",
              title: "비밀번호를 확인해주세요",
              confirmButtonText: "확인",
            });
          }
          // NOTE 아이디 불일치
          else if (data.result === "25") {
            Swal.fire({
              icon: "warning",
              title: "아이디를 확인해주세요",
              confirmButtonText: "확인",
            });
          }
        },
        onError: (error) => {
          console.log(error);
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "로그인 요청 중 오류가 발생했습니다. 다시 시도해주세요",
            confirmButtonText: "확인",
          });
        },
      },
    );
  }
  // NOTE 롯데
  else if (login.company === "LOTTE") {
    return useMutation<ILoginResponse, unknown, void, unknown>(
      "getLogin",
      () =>
        LotteInstance.post("/watcher/sign", {
          api: "signIn",
          data: [
            { user_id: userId, user_password: userPassword, company: "lotte" },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            setLogin({
              ...login,
              isLogin: true,
              userId: data.data[0].user_id,
              branchName: data.data[0].bran_exp,
              branchCode: data.data[0].bran_cd,
              saId: data.data[0].sa_id,
              accountId: data.data[0].account_id,
              camUsable: data.data[0].cam_usable,
            });

            navigate("/");
          }
          // NOTE 비밀번호 불일치
          else if (data.result === "08") {
            Swal.fire({
              icon: "warning",
              title: "비밀번호를 확인해주세요",
              confirmButtonText: "확인",
            });
          }
          // NOTE 아이디 불일치
          else if (data.result === "25") {
            Swal.fire({
              icon: "warning",
              title: "아이디를 확인해주세요",
              confirmButtonText: "확인",
            });
          }
        },
        onError: (error) => {
          console.log(error);
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "로그인 요청 중 오류가 발생했습니다. 다시 시도해주세요",
            confirmButtonText: "확인",
          });
        },
      },
    );
  }
  // NOTE 한진
  else if (login.company === "HANJIN") {
    return useMutation<ILoginResponse, unknown, void, unknown>(
      "getLogin",
      () =>
        HanjinInstance.post("/watcher/sign", {
          api: "signIn",
          data: [
            { user_id: userId, user_password: userPassword, company: "hanjin" },
          ],
        }),
      {
        onSuccess: (data) => {
          if (data.result === "00") {
            setLogin({
              ...login,
              isLogin: true,
              userId: data.data[0].user_id,
              branchName: data.data[0].bran_exp,
              branchCode: data.data[0].bran_cd,
              saId: data.data[0].sa_id,
              accountId: data.data[0].account_id,
              camUsable: data.data[0].cam_usable,
            });

            navigate("/");
          }
          // NOTE 비밀번호 불일치
          else if (data.result === "08") {
            Swal.fire({
              icon: "warning",
              title: "비밀번호를 확인해주세요",
              confirmButtonText: "확인",
            });
          }
          // NOTE 아이디 불일치
          else if (data.result === "25") {
            Swal.fire({
              icon: "warning",
              title: "아이디를 확인해주세요",
              confirmButtonText: "확인",
            });
          }
        },
        onError: (error) => {
          console.log(error);
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "로그인 요청 중 오류가 발생했습니다. 다시 시도해주세요",
            confirmButtonText: "확인",
          });
        },
      },
    );
  }

  return useMutation<ILoginResponse, unknown, void, unknown>(
    "getLogin",
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
