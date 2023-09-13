import { UseMutateFunction } from "react-query";
import { SetterOrUpdater } from "recoil";

export interface IFilterState {
  receivingShipment: "receive" | "shipment";
  date: string;
  invoiceNumber: string;
}

export interface IFilterProps {
  filterOption: IFilterState;
  setFilterOption: SetterOrUpdater<IFilterState>;
  dateMutate: UseMutateFunction<any, unknown, void, unknown>;
  invoiceMutate: UseMutateFunction<any, unknown, void, unknown>;
}
