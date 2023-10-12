import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../stores/loginState";
import { Navigate } from "react-router";

type LoginRouteProps = {
  children: ReactNode;
};

export default function LoginRoute({ children }: LoginRouteProps) {
  const login = useRecoilValue(loginState);

  return login.isLogin ? <>{children}</> : <Navigate to="/login" />;
}
