import { UseMutateFunction } from "react-query";
import { SetterOrUpdater } from "recoil";
import { ICheckedItems } from "./Work.types";
import { Dispatch, SetStateAction } from "react";

export interface IFilterState {
  receivingShipment: "receive" | "shipment" | "goods" | "all";
  date: string;
  invoiceNumber: string;
}

export interface IFilterProps {
  filterOption: IFilterState;
  setFilterOption: SetterOrUpdater<IFilterState>;
  dateMutate: UseMutateFunction<any, unknown, void, unknown>;
  invoiceMutate: UseMutateFunction<any, unknown, void, unknown>;
  checkedItems?: ICheckedItems[];
  setCheckedItems?: Dispatch<SetStateAction<ICheckedItems[]>>;
  setAllChecked?: Dispatch<SetStateAction<boolean>>;
}
