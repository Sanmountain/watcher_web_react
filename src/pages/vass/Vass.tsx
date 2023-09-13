import { useRecoilState, useRecoilValue } from "recoil";
import Filter from "../../components/common/Filter";
import Table from "../../components/common/Table";
import { vassFilterState } from "../../stores/vass/vassFilterState";
import { vassListState } from "../../stores/vass/vassListState";
import { getVassDateList } from "../../api/vass/getVassDateList";
import { getVassInvoiceList } from "../../api/vass/getVassInvoiceList";

export default function Vass() {
  const title = [
    { label: "No.", value: "" },
    { label: "업무", value: "tm_dv" },
    { label: "날짜 & 시간", value: "scan_total_time" },
    { label: "차량번호", value: "car_num" },
    { label: "송장번호", value: "barcode" },
    { label: "화물추적", value: "button" },
  ];

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
        title={title}
        contents={vassList}
        columns={6}
        dateLoading={isDateMutateLoading}
        invoiceLoading={isInvoiceNumberMutateLoading}
      />
    </>
  );
}
