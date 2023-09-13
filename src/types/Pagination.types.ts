import { Dispatch, SetStateAction } from "react";

export interface IPaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
