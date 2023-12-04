import { Dispatch, SetStateAction } from "react";
import { ICheckedItems } from "./Work.types";

export interface ITmDvEditModalProps {
  checkedItems?: undefined | ICheckedItems[];
  setCheckedItems?: undefined | Dispatch<SetStateAction<ICheckedItems[]>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
