import dayjs from "dayjs";
import * as XLSX from "xlsx";
import { IFilterState } from "../types/Filter.types";
import { IWorkListData } from "../types/Work.types";

export const excelDownload = (
  branchName: string,
  filterOption: IFilterState,
  tableContents: IWorkListData[],
) => {
  const excelFileName = `${branchName} ${dayjs(filterOption.date).format(
    "YYYY-MM-DD",
  )}.xlsx`;

  const excelSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tableContents);

  const excelBook: XLSX.WorkBook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(excelBook, excelSheet, excelFileName);

  XLSX.writeFile(excelBook, excelFileName);
};
