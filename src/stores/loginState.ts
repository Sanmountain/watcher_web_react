import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ILoginState } from "../types/Login.types";

const { persistAtom } = recoilPersist();

export const loginState = atom<ILoginState>({
  key: "VASSLogin",
  default: {
    isLogin: false,
    isUserIdStored: false,
    company: "",
    userId: "",
    branchName: "",
    branchCode: "",
    localIP: "",
    saId: "",
    accountId: "",
    camUsable: "",
    isAdmin: false,
    camStatus: "",
  },
  effects_UNSTABLE: [persistAtom],
});
