import { atom } from "recoil";

export const weekTotalState = atom({
  key: "weekTotalState",
  default: 0,
});

export const inWeekTotalState = atom({
  key: "inTotalState",
  default: 0,
});

export const outWeekTotalState = atom({
  key: "outTotalState",
  default: 0,
});
