import { useRecoilState, useRecoilValue } from "recoil";
import Filter from "../components/common/Filter";
import Table from "../components/common/Table";
import { workFilterState } from "../stores/work/workFilterState";
import { getWorkDateList } from "../api/work/getWorkDateList";
import { workListState } from "../stores/work/workListState";
import { getWorkInvoiceList } from "../api/work/getWorkInvoiceList";
import { loginState } from "../stores/loginState";

export default function Work() {
  const title = [
    { label: "No.", value: "" },
    { label: "업무", value: "tm_dv" },
    { label: "영업소", value: "bran_cd" },
    { label: "상대영업소", value: "tg_bran_cd" },
    { label: "차량", value: "car_num" },
    { label: "송장", value: "barcode" },
    { label: "상대", value: "pob" },
    { label: "날짜", value: "scandate" },
    { label: "시간", value: "scantime" },
    { label: "사원", value: "emp_cd" },
  ];

  const hanjinTitle = [
    { label: "No.", value: "" },
    { label: "업무", value: "tm_dv" },
    { label: "영업소", value: "bran_cd" },
    { label: "간선편명", value: "trk" },
    { label: "송장", value: "barcode" },
    { label: "상대", value: "pob" },
    { label: "날짜", value: "scandate" },
    { label: "시간", value: "scantime" },
    { label: "사원", value: "emp_cd" },
  ];

  const login = useRecoilValue(loginState);
  const [filterOption, setFilterOption] = useRecoilState(workFilterState);
  const workList = useRecoilValue(workListState);

  const { mutate: workDateListMutate, isLoading: isDateMutateLoading } =
    getWorkDateList();
  const {
    mutate: workInvoiceNumberListMutate,
    isLoading: isInvoiceNumberMutateLoading,
  } = getWorkInvoiceList();

  return (
    <>
      <Filter
        filterOption={filterOption}
        setFilterOption={setFilterOption}
        dateMutate={workDateListMutate}
        invoiceMutate={workInvoiceNumberListMutate}
      />
      <Table
        title={
          login.company === "HANJIN" || login.company === "HANDEX"
            ? hanjinTitle
            : title
        }
        contents={workList}
        columns={
          login.company === "HANJIN" || login.company === "HANDEX" ? 9 : 10
        }
        dateLoading={isDateMutateLoading}
        invoiceLoading={isInvoiceNumberMutateLoading}
      />
    </>
  );
}
