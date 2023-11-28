import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../stores/loginState";
import { Navigate } from "react-router";

type LoginRouteProps = {
  children: ReactNode;
};

export default function LoginRoute({ children }: LoginRouteProps) {
  const login = useRecoilValue(loginState);

  if (!login.isLogin) return <Navigate to="/login" />;

  if (!login.camStatus || !login.camUsable) {
    return <Navigate to="/login" />;
  } else return <>{children}</>;
}
