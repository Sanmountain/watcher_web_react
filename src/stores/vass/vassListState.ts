import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { IWorkListData } from "../../types/Work.types";

const { persistAtom } = recoilPersist();

export const vassListState = atom<IWorkListData[]>({
  key: "vassListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
