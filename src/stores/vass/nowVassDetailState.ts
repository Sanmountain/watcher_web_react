import { atom } from "recoil";
import { IWorkListData } from "../../types/Work.types";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const nowVassDetailState = atom<IWorkListData>({
  key: "nowVassDetailState",
  default: {
    id: "",
    tm_dv: "",
    bran_cd: "",
    pob: "",
    car_num: "",
    barcode: "",
    barcode_sub: "",
    tg_bran_cd: "",
    scandate: "",
    scantime: "",
    scan_total_time: "",
    emp_cd: "",
    service_cd: "",
    arrive_cd: "",
    reason_cd: "",
    bulk_cargo_it: "",
    trans_equip: "",
    reg_date: "",
    update_date: "",
    longTime: "",
    dev_serial: "",
    dev_ver: "",
    seq: "",
    row_num: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
