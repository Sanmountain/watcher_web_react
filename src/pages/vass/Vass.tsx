import { useRecoilState, useRecoilValue } from "recoil";
import Filter from "../../components/common/Filter";
import Table from "../../components/common/Table";
import { vassFilterState } from "../../stores/vassFilterState";
import { workListState } from "../../stores/work/workListState";

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
  // NOTE 임시
  const workList = useRecoilValue(workListState);

  return (
    <>
      <Filter
        filterOption={filterOption}
        setFilterOption={setFilterOption}
        dateMutate={console.log("ddd")}
        invoiceMutate={console.log("dddd")}
      />
      <Table
        title={title}
        contents={workList}
        columns={6}
        dateLoading={false}
        invoiceLoading={false}
      />
    </>
  );
}
