import { atom } from "recoil";
import { IWorkListData } from "../../types/Work.types";

export const workListState = atom<IWorkListData[]>({
  key: "workListState",
  default: [],
});
