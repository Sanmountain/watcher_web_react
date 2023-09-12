import { Location } from "react-router";

export const getLoginPage = (location: Location) => {
  return location.pathname === "/login";
};
