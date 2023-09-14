import { Dispatch, SetStateAction } from "react";
import { ICameraInfoData } from "./cameraInfo.types";

export interface IEditing {
  [cam_id: string]: boolean;
}

export interface ICameraModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  changePlaySequence: ICameraInfoData[];
  setChangePlaySequence: Dispatch<SetStateAction<ICameraInfoData[]>>;
  editing: IEditing[];
  setEditing: Dispatch<SetStateAction<IEditing[]>>;
  setCameraInfo: Dispatch<SetStateAction<ICameraInfoData[]>>;
}
