import { ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../stores/loginState";
import Swal from "sweetalert2";
import { Navigate } from "react-router";

type LoginRouteProps = {
  children: ReactNode;
};

export default function LoginRoute({ children }: LoginRouteProps) {
  const login = useRecoilValue(loginState);

  useEffect(() => {
    if (!login.isLogin) {
      Swal.fire({
        title: "Error!",
        text: "로그인이 필요합니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    }
  }, [login.isLogin]);

  return login.isLogin ? <>{children}</> : <Navigate to="/login" />;
}
