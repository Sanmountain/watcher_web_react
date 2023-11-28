import { ILoginState } from "../types/Login.types";

export const getMenuList = (login: ILoginState) => {
  let menuList;

  // NOTE PDA 사용 지점, 이미지 사용하지 않는 지점
  if (login.camStatus === "0") {
    if (login.isAdmin) {
      menuList = [
        { label: "송장조회", path: "/work" },
        { label: "이미지설정", path: "/imageSetting" },
      ];
    } else menuList = [{ label: "송장조회", path: "/work" }];
  }

  // NOTE 오토스캐너 사용 지점 = sk
  else if (login.camUsable === "1") {
    if (login.isAdmin) {
      if (login.camStatus === "0") {
        menuList = [
          { label: "송장조회", path: "/work" },
          { label: "이미지설정", path: "/imageSetting" },
        ];
      } else if (login.camStatus === "1") {
        menuList = [
          { label: "송장조회", path: "/work" },
          { label: "이미지조회", path: "/image" },
          { label: "이미지설정", path: "/imageSetting" },
        ];
      }
    } else {
      if (login.camStatus === "0") {
        menuList = [{ label: "송장조회", path: "/work" }];
      } else if (login.camStatus === "1") {
        menuList = [
          { label: "송장조회", path: "/work" },
          { label: "이미지조회", path: "/image" },
        ];
      }
    }
  }

  // NOTE 오토스캐너+CCTV 사용 지점
  else if (login.camUsable === "2") {
    menuList = [
      { label: "송장조회", path: "/work" },
      { label: "화물추적", path: "/vass" },
    ];
  }

  // NOTE 이미지 조회 기능 추가 구매 지점
  else if (login.camStatus === "1") {
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
  }

  return menuList;
};
