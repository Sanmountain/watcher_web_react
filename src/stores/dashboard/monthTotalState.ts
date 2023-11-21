import { atom } from "recoil";

export const monthTotalState = atom({
  key: "monthTotalState",
  default: 0,
});

export const inMonthTotalState = atom({
  key: "inTotalState",
  default: 0,
});

export const outMonthTotalState = atom({
  key: "outTotalState",
  default: 0,
});
