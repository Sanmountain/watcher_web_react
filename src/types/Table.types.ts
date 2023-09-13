// import { IWorkListData } from "./Work.types";

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
}
