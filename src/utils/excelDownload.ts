import * as XLSX from "xlsx";
import { IWorkListData } from "../types/Work.types";

export const excelDownload = (
  branchName: string,
  date: string,
  tableContents: IWorkListData[],
) => {
  const excelFileName = `${branchName} ${date}.xlsx`;

  const excelSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tableContents);

  const excelBook: XLSX.WorkBook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(excelBook, excelSheet, excelFileName);

  XLSX.writeFile(excelBook, excelFileName);
};
