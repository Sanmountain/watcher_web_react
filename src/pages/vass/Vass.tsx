import Filter from "../../components/common/Filter";
import Table from "../../components/common/Table";

export default function Vass() {
  const title = [
    "No.",
    "업무",
    "날짜 & 시간",
    "차량번호",
    "송장번호",
    "화물추적",
  ];

  const contents = [""];

  return (
    <>
      <Filter />
      <Table title={title} contents={contents} columns={6} />
    </>
  );
}
