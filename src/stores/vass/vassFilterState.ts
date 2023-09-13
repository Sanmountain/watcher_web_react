import { atom } from "recoil";
import dayjs from "dayjs";
import { IFilterState } from "../../types/Filter.types";

export const vassFilterState = atom<IFilterState>({
  key: "vassFilterState",
  default: {
    receivingShipment: "shipment",
    date: dayjs().format("YYYY-MM-DD"),
    invoiceNumber: "",
  },
});
