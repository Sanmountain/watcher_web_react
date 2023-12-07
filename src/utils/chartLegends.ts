import { colors } from "../styles/palette";

export const chartLegends = (company: string) => {
  const legendsData = [
    {
      id: "handexCountIn",
      label:
        company === "LOGEN"
          ? "배송입고"
          : company === "LOTTE"
            ? "도착"
            : company === "HANJIN"
              ? "간선상차"
              : "영업소상차",
      color: colors.green[100],
    },
    {
      id: "handexCountOut",
      label:
        company === "LOGEN"
          ? "집하출고"
          : company === "LOTTE"
            ? "발송"
            : company === "HANJIN"
              ? "간선하차"
              : "영업소하차",
      color: colors.blue[100],
    },
  ];

  if (company === "HANDEX") {
    legendsData.push({
      id: "handexCountPick",
      label: "상품집하",
      color: colors.yellow[100],
    });
  }

  return legendsData;
};
