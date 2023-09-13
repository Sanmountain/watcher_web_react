import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ILoginState } from "../types/Login.types";

const { persistAtom } = recoilPersist();

export const loginState = atom<ILoginState>({
  key: "loginState",
  default: {
    isLogin: false,
    isUserIdStored: false,
    userId: "",
    branchName: "",
    localIP: "",
  },
  effects_UNSTABLE: [persistAtom],
});
