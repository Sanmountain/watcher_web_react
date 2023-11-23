import { atom } from "recoil";
import dayjs from "dayjs";
import { IFilterState } from "../../types/Filter.types";

export const workFilterState = atom<IFilterState>({
  key: "workFilterState",
  default: {
    receivingShipment: "all",
    date: dayjs().format("YYYY-MM-DD"),
    invoiceNumber: "",
  },
});
