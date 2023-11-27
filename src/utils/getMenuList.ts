import { ILoginState } from "../types/Login.types";

export const getMenuList = (login: ILoginState) => {
  let menuList;

  if (login.camUsable === "0") {
    if (login.isAdmin) {
      menuList = [
        { label: "송장조회", path: "/work" },
        { label: "이미지설정", path: "/imageSetting" },
      ];
    } else menuList = [{ label: "송장조회", path: "/work" }];
  } else if (login.camUsable === "1" || login.camUsable === "3") {
    if (login.isAdmin) {
      menuList = [
        { label: "송장조회", path: "/work" },
        { label: "이미지조회", path: "/image" },
        { label: "이미지설정", path: "/imageSetting" },
      ];
    } else
      menuList = [
        { label: "송장조회", path: "/work" },
        { label: "이미지조회", path: "/image" },
      ];
  } else if (login.camUsable === "2") {
    if (login.isAdmin) {
      menuList = [
        { label: "송장조회", path: "/work" },
        { label: "화물추적", path: "/vass" },
        { label: "이미지설정", path: "/imageSetting" },
      ];
    } else
      menuList = [
        { label: "송장조회", path: "/work" },
        { label: "화물추적", path: "/vass" },
      ];
  }

  return menuList;
};
