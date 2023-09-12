import Filter from "../components/common/Filter";
import Table from "../components/common/Table";

export default function Work() {
  const title = [
    "No.",
    "업무",
    "영업소",
    "상대영업소",
    "차량",
    "송장",
    "상대",
    "날짜",
    "시간",
    "사원",
  ];

  const contents = [""];

  return (
    <>
      <Filter />
      <Table title={title} contents={contents} columns={10} />
    </>
  );
}
