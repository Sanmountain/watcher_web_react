import { useEffect, useState } from "react";
import BarChart from "../components/common/chart/BarChart";
import LineChart from "../components/common/chart/LineChart";
import * as S from "../styles/Dashboard.styles";
import { IWorkListData } from "../types/Work.types";
import { getAmount } from "../api/dashboard/getAmount";
import { numberWithCommas } from "../utils/numberWithCommas";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import {
  inWeekTotalState,
  outWeekTotalState,
} from "../stores/dashboard/weekTotalState";
import {
  inMonthTotalState,
  outMonthTotalState,
} from "../stores/dashboard/monthTotalState";
import { loginState } from "../stores/loginState";

export default function Dashboard() {
  const login = useRecoilValue(loginState);
  const [shipmentCount, setShipmentCount] = useState<IWorkListData[]>([]);
  const [receiveCount, setReceiveCount] = useState<IWorkListData[]>([]);
  const [goodsCount, setGoodsCount] = useState<IWorkListData[]>([]);

  const weekInTotal = useRecoilValue(inWeekTotalState);
  const weekOutTotal = useRecoilValue(outWeekTotalState);
  const weekTotal = weekInTotal + weekOutTotal;

  const monthInTotal = useRecoilValue(inMonthTotalState);
  const monthOutTotal = useRecoilValue(outMonthTotalState);
  const monthTotal = monthInTotal + monthOutTotal;

  const { mutate: getAmountMutate } = getAmount(
    setShipmentCount,
    setReceiveCount,
    setGoodsCount,
  );

  useEffect(() => {
    getAmountMutate();
  }, []);

  return (
    <S.Container>
      <S.TopContainer $login={login}>
        <S.Date $login={login}>{dayjs().format("YYYY-MM-DD")}</S.Date>
        <S.CountContainer>
          {login.company === "LOGEN" && "배송입고"}
          {login.company === "LOTTE" && "도착"}
          {login.company === "HANJIN" && "간선상차"}
          {login.company === "HANDEX" && "영업소상차"}
          <S.Count $login={login}>
            <p>스캔 수량</p>
            <p className="count">
              {numberWithCommas(receiveCount?.length) || 0} 건
            </p>
          </S.Count>
        </S.CountContainer>
        <S.CountContainer>
          {login.company === "LOGEN" && "집하출고"}
          {login.company === "LOTTE" && "발송"}
          {login.company === "HANJIN" && "간선하차"}
          {login.company === "HANDEX" && "영업소하차"}
          <S.Count $login={login}>
            <p>스캔 수량</p>
            <p className="count">
              {numberWithCommas(shipmentCount?.length) || 0} 건
            </p>
          </S.Count>
        </S.CountContainer>
        {login.company === "HANDEX" && (
          <S.CountContainer>
            상품집하
            <S.Count $login={login}>
              <p>스캔 수량</p>
              <p className="count">
                {numberWithCommas(goodsCount?.length) || 0} 건
              </p>
            </S.Count>
          </S.CountContainer>
        )}
      </S.TopContainer>
      <S.BottomContainer>
        <S.ChartContainer>
          <S.ChartTitle>주간 스캔 수량</S.ChartTitle>
          <S.ChartCount>{numberWithCommas(weekTotal)} 건</S.ChartCount>
          <S.Chart>
            <BarChart />
          </S.Chart>
        </S.ChartContainer>
        <S.ChartContainer>
          <S.ChartTitle>2023년 스캔 수량</S.ChartTitle>
          <S.ChartCount>{numberWithCommas(monthTotal)} 건</S.ChartCount>
          <S.Chart>
            <LineChart />
          </S.Chart>
        </S.ChartContainer>
      </S.BottomContainer>
    </S.Container>
  );
}
