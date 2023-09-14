import { atom } from "recoil";
import { IVideoListData } from "../../types/videoList.types";

export const videoListState = atom<IVideoListData[]>({
  key: "videoListState",
  default: [],
});
