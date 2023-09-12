import { ReactNode } from "react";
import { useLocation } from "react-router";
import { getLoginPage } from "../../utils/getLocationPath";
import Sidebar from "./Sidebar";
import * as S from "../../styles/layout/Layout.styles";
import Header from "./Header";

type ILayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: ILayoutProps) {
  const location = useLocation();

  const LOGIN_PAGE = getLoginPage(location);

  return LOGIN_PAGE ? (
    <S.Container>{children}</S.Container>
  ) : (
    <S.Container>
      <Sidebar />
      <S.ChildrenHeaderContainer>
        <Header />
        <S.ChildrenContainer>{children}</S.ChildrenContainer>
      </S.ChildrenHeaderContainer>
    </S.Container>
  );
}
