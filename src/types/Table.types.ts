import { Dispatch, SetStateAction } from "react";
import { ICheckedItems } from "./Work.types";

export type ITitle = {
  label: string;
  value: string;
};

export interface ITableProps {
  title: ITitle[];
  contents: any[];
  columns: number;
  dateLoading: boolean;
  invoiceLoading: boolean;
  checkedItems?: ICheckedItems[];
  setCheckedItems?: Dispatch<SetStateAction<ICheckedItems[]>>;
  allChecked?: boolean;
  setAllChecked?: Dispatch<SetStateAction<boolean>>;
}
