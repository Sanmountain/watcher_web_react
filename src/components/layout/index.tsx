import { ReactNode } from "react";

type ILayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: ILayoutProps) {
  return <>{children}</>;
}
