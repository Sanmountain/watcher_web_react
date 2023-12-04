import { atom } from "recoil";

export const workPageState = atom({
  key: "workPageState",
  default: "1",
});

export const workLastPageState = atom({
  key: "workLastPageState",
  default: "999",
});
