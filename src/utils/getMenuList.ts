import { ILoginState } from "../types/Login.types";

export const getMenuList = (login: ILoginState) => {
  const baseMenu = [{ label: "송장조회", path: "/work" }];
  const additionalMenus = [];

  // NOTE 이미지 기능 추가 구매 지점 또는 오토스캐너 사용 지점
  if (login.camStatus === "1" || login.camUsable === "1") {
    additionalMenus.push({ label: "이미지조회", path: "/image" });
  }

  // NOTE 오토스캐너+CCTV 사용 지점
  if (login.camUsable === "2") {
    additionalMenus.push({ label: "영상추적", path: "/vass" });
  }

  // NOTE 이미지 설정 메뉴
  const adminMenu = { label: "어드민", path: "/admin" };

  // NOTE 관리자일 경우 이미지 설정 메뉴 추가
  if (login.isAdmin) {
    additionalMenus.push(adminMenu);
  }

  const menuList = baseMenu.concat(additionalMenus);
  return menuList;
};