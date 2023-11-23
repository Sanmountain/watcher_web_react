import { useRecoilState, useRecoilValue } from "recoil";
import Filter from "../components/common/Filter";
import Table from "../components/common/Table";
import { loginState } from "../stores/loginState";
import { vassFilterState } from "../stores/vass/vassFilterState";
import { vassListState } from "../stores/vass/vassListState";
import { getVassDateList } from "../api/vass/getVassDateList";
import { getVassInvoiceList } from "../api/vass/getVassInvoiceList";

export default function Image() {
  const title = [
    { label: "No.", value: "" },
    { label: "업무", value: "tm_dv" },
    { label: "날짜 & 시간", value: "scan_total_time" },
    { label: "차량번호", value: "car_num" },
    { label: "송장번호", value: "barcode" },
    { label: "이미지", value: "button" },
  ];

  const hanjinTitle = [
    { label: "No.", value: "" },
    { label: "업무", value: "tm_dv" },
    { label: "날짜 & 시간", value: "scan_total_time" },
    { label: "간선편명", value: "trk" },
    { label: "송장번호", value: "barcode" },
    { label: "이미지", value: "button" },
  ];

  const login = useRecoilValue(loginState);
  const [filterOption, setFilterOption] = useRecoilState(vassFilterState);
  const vassList = useRecoilValue(vassListState);

  const { mutate: vassDateListMutate, isLoading: isDateMutateLoading } =
    getVassDateList();
  const {
    mutate: vassInvoiceNumberListMutate,
    isLoading: isInvoiceNumberMutateLoading,
  } = getVassInvoiceList();

  return (
    <>
      <Filter
        filterOption={filterOption}
        setFilterOption={setFilterOption}
        dateMutate={vassDateListMutate}
        invoiceMutate={vassInvoiceNumberListMutate}
      />
      <Table
        title={login.company === "HANJIN" ? hanjinTitle : title}
        contents={vassList}
        columns={6}
        dateLoading={isDateMutateLoading}
        invoiceLoading={isInvoiceNumberMutateLoading}
      />
    </>
  );
}
