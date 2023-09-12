import { Location } from "react-router";

export const getLoginPage = (location: Location) => {
  return location.pathname === "/login";
};

export const getVassPage = (location: Location) => {
  return location.pathname === "/vass";
};
