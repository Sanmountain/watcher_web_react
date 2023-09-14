import { SetterOrUpdater, useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { useMutation } from "react-query";
import { videoInstance } from "../instance";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import {
  IVideoListData,
  IVideoListResponse,
} from "../../types/videoList.types";
import { nowVassDetailState } from "../../stores/vass/nowVassDetailState";

export const getVideoList = (
  setVideoList: SetterOrUpdater<IVideoListData[]>,
) => {
  const login = useRecoilValue(loginState);
  const nowVassDetail = useRecoilValue(nowVassDetailState);

  const startTime = dayjs(nowVassDetail?.scan_total_time)
    .subtract(5, "seconds")
    .format("YYYYMMDDHHmmss");
  const endTime = dayjs(nowVassDetail?.scan_total_time)
    .add(30, "minutes")
    .format("YYYYMMDDHHmmss");

  return useMutation<IVideoListResponse, unknown, void, unknown>(
    "getVideoList",
    () =>
      videoInstance.post("/getRecordVideoList", {
        sa_id: login.saId,
        account_id: login.accountId,
        ip: login.localIP,
        start_time: startTime,
        end_time: endTime,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setVideoList(data.cam_list);
        } else if (data.result === "11") {
          Swal.fire({
            icon: "warning",
            title: "해당 지점은 영상 조회가 불가능합니다.",
            confirmButtonText: "확인",
          });
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
