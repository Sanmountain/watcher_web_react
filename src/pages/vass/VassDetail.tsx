import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import * as S from "../../styles/VassDetail.styles";
import Pagination from "../../components/common/Pagination";
import ReactPlayer from "react-player";
import CameraModal from "../../components/common/CameraModal";
import modalClose from "../../utils/modalClose";
import { getVideoList } from "../../api/vass/getVideoList";
import { ICameraInfoData } from "../../types/cameraInfo.types";
import { getCameraInfo } from "../../api/vass/getCameraInfo";
import { useRecoilState, useRecoilValue } from "recoil";
import { vassListState } from "../../stores/vass/vassListState";
import dayjs, { Dayjs } from "dayjs";
import { nowVassDetailState } from "../../stores/vass/nowVassDetailState";
import { prevVassDetailState } from "../../stores/vass/prevVassDetailState";
import axios from "axios";
import { videoListState } from "../../stores/vass/videoListState";
import CommonButton from "../../components/common/CommonButton";
import { getVassDetailInvoice } from "../../api/vass/getVassDetailInvoice";

export default function VassDetail() {
  // NOTE pagination
  const videosPerPage = 4;
  const [currentPage] = useState(1);
  const videoStartIndex = (currentPage - 1) * videosPerPage;
  const videoEndIndex = videoStartIndex + videosPerPage;
  const [page, setPage] = useState(0);

  const [videoList, setVideoList] = useRecoilState(videoListState);
  const [cameraInfo, setCameraInfo] = useState<ICameraInfoData[]>([]);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // NOTE player control
  const vassList = useRecoilValue(vassListState);
  const nowVassDetail = useRecoilValue(nowVassDetailState);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playTime, setPlayTime] = useState(0);
  const [pausedTime, setPausedTime] = useState<Dayjs | null>(
    dayjs(nowVassDetail.scan_total_time),
  );

  // NOTE 바코드 화면 상에 띄우기
  const [currentBarcodes, setCurrentBarcodes] = useState<string[]>([]);
  const [displayedBarcodes, setDisplayedBarcodes] = useState<string[]>([]);
  //  isPlaying true -> false -> true가 됐을 때 시작시간 기록용
  const currentScanTimeRef = useRef<Dayjs | null | undefined>(
    dayjs(nowVassDetail.scan_total_time),
  );

  // NOTE 담당직원, 배송상태
  const [searchInvoice, setSearchInvoice] = useState<number | null>(null);
  const [deliveryManName, setDeliveryManName] = useState<string | null>("");
  const [deliveryState, setDeliveryState] = useState("");
  const [refetchList, setRefetchList] = useState(0);
  const prevVassDetail = useRecoilValue(prevVassDetailState);

  const outSide = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<(ReactPlayer | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { mutate: videoListMutate } = getVideoList(setVideoList);
  const { mutate: cameraInfoMutate } = getCameraInfo(setCameraInfo);
  const { mutate: vassDetailInvoiceMutate } = getVassDetailInvoice(
    searchInvoice,
    setRefetchList,
  );

  // NOTE video list 담기
  useEffect(() => {
    videoListMutate();
  }, [refetchList]);

  // NOTE camera info 담기
  useEffect(() => {
    cameraInfoMutate();
  }, []);

  // NOTE 담당직원, 배송상태 담기
  useEffect(() => {
    axios
      .get(
        `https://apis.tracker.delivery/carriers/kr.lotte/tracks/${prevVassDetail.barcode}`,
      )
      .then((res) => {
        const vassDelivery = res.data;

        const extractDeliveryManName = (description: string) => {
          const keyword = "배송담당: ";
          const startIndex = description.indexOf(keyword);

          if (startIndex === -1) return null; // 키워드가 없을 경우 null 반환

          const subStr = description
            .substring(startIndex + keyword.length)
            .trim(); // 키워드 뒤의 문자열을 가져온 후 앞뒤 공백 제거
          const endIndex = subStr.indexOf(" "); // 뒤에 오는 첫 번째 공백의 위치

          if (endIndex === -1) return subStr; // 뒤에 공백이 없을 경우 남은 문자열 반환

          return subStr.substring(0, endIndex);
        };

        setDeliveryManName(
          extractDeliveryManName(
            vassDelivery?.progresses[vassDelivery?.progresses.length - 1]
              .description,
          ),
        );

        setDeliveryState(vassDelivery?.state.text);
      })
      .catch((err) => console.log(err));
  }, [refetchList, nowVassDetail, prevVassDetail]);

  // NOTE 화면상 바코드 띄우기
  useEffect(() => {
    getBarcodes();
  }, [isPlaying]);

  useEffect(() => {
    if (currentBarcodes.length > 0) {
      setDisplayedBarcodes((prevBarcodes) => {
        // 이미 displayedBarcodes에 존재하는 바코드를 걸러내기
        const newBarcodes = currentBarcodes.filter(
          (barcode) => !prevBarcodes.includes(barcode),
        );

        // 존재하지 않는 바코드만 추가하기
        const updatedBarcodes = [...prevBarcodes, ...newBarcodes];
        return updatedBarcodes.slice(-12); // 최근 12개만 유지
      });
    }
  }, [currentBarcodes, refetchList]);

  // NOTE 모달 닫힘
  useEffect(() => {
    modalClose(isSettingOpen, setIsSettingOpen, outSide);
  }, [isSettingOpen]);

  // NOTE 영상 컨트롤러
  // TODO 영상 새로고침
  const onClickRefresh = () => {
    window.location.reload();
  };

  // TODO 영상 10초 전
  const onClickMoveBefore10Second = () => {
    if (playerRef.current) {
      playerRef.current.forEach((player) => {
        const currentTime = player?.getCurrentTime() ?? 0;
        player?.seekTo(currentTime - 10);
      });
    }
  };

  // TODO 영상 10초 후
  const onClickMoveAfter10Second = () => {
    if (playerRef.current) {
      playerRef.current.forEach((player) => {
        const currentTime = player?.getCurrentTime() ?? 0;
        player?.seekTo(currentTime + 10);
      });
    }
  };

  // TODO 모든 영상 재생, 일시정지
  const handlePlayVideos = useCallback(() => {
    for (const ref of playerRef.current) {
      if (ref) {
        if (isPlaying) {
          ref.getInternalPlayer().pause();
        } else {
          ref.getInternalPlayer().play();
        }
      }
    }
    // 재생 상태를 반전
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // NOTE 스페이스바로 재생, 일시정지
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handlePlayVideos();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [handlePlayVideos]);

  // NOTE 바코드 화면 상에 띄우기
  const getBarcodes = () => {
    // isPlaying 변경될 때마다 이전 타이머를 삭제
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // isPlaying이 false일 때, pausedTime을 업데이트하고 함수 종료
    if (!isPlaying) {
      const videoStartDate = dayjs(nowVassDetail.scan_total_time); // 비디오 시작 시간
      const videoStartDateMinusFive = videoStartDate.subtract(5, "second");
      const playTimeInMilliseconds: number = playTime * 1000; // 현재 재생시간

      const pausedTimeInMilliseconds =
        videoStartDateMinusFive.valueOf() + playTimeInMilliseconds;

      const updatedPausedTime = dayjs(pausedTimeInMilliseconds);

      setPausedTime(updatedPausedTime);
      currentScanTimeRef.current = updatedPausedTime;

      return;
    }

    // isPlaying이 true일 때, isPlaying이 false였다가 true로 된 경우와 첫 자동재생인 true인 경우 분기처리
    if (pausedTime !== dayjs(nowVassDetail.scan_total_time)) {
      currentScanTimeRef.current = dayjs(pausedTime);
    } else {
      currentScanTimeRef.current = dayjs(
        nowVassDetail.scan_total_time,
      ).subtract(11, "second");
    }

    const scanVideo = () => {
      // 1초마다 증가시키기
      currentScanTimeRef.current = currentScanTimeRef.current?.add(1, "second");

      const matchedVideos = vassList.filter((video) => {
        const checkTimeInSeconds = Math.floor(
          dayjs(video.scan_total_time).valueOf() / 1000,
        );
        const currentScanTimeInSeconds: number = Math.floor(
          (currentScanTimeRef.current?.valueOf() as number) / 1000,
        );

        return checkTimeInSeconds === currentScanTimeInSeconds;
      });

      const matchedBarcodes = matchedVideos.map((video) => video.barcode);
      setCurrentBarcodes(matchedBarcodes.length ? matchedBarcodes : [""]);

      timerRef.current = setTimeout(scanVideo, 1000);
    };

    scanVideo();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current); // 컴포넌트 정리 시 타이머 제거
    };
  };

  // NOTE 설정 모달 열리고 닫힘
  const onClickSetting = () => {
    setIsSettingOpen(!isSettingOpen);
  };

  // NOTE 영상 순서 변경 메뉴 클릭
  const onClickChangeSequence = () => {
    setIsModalOpen(true);
    setIsSettingOpen(false);
  };

  const handelSearchInvoice = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInvoice(Number(e.target.value));
  };

  const onClickSearchInvoice = () => {
    vassDetailInvoiceMutate();
  };

  return (
    <>
      <S.ShoppingMallContainer>
        <S.InvoiceButtonContainer>
          <CommonButton
            contents="송장번호 조회"
            onClickFn={onClickSearchInvoice}
          />
        </S.InvoiceButtonContainer>
        <S.InvoiceInput
          placeholder="송장번호를 입력해주세요"
          onChange={handelSearchInvoice}
        />

        <S.InvoiceInfoContainer>
          <p>현재 송장번호</p>
          <S.InvoiceInfo>{nowVassDetail.barcode}</S.InvoiceInfo>
        </S.InvoiceInfoContainer>

        <S.InvoiceInfoContainer>
          <p>이전 송장번호</p>
          <S.InvoiceInfo className="prev">
            {prevVassDetail.barcode}
          </S.InvoiceInfo>
        </S.InvoiceInfoContainer>

        <S.TradeSubInfoContainer>
          <p>담당직원 :{deliveryManName}</p>
          <p>{deliveryState}</p>
        </S.TradeSubInfoContainer>
      </S.ShoppingMallContainer>
      <S.Container>
        <S.VideoControllerContainer>
          <S.Controller onClick={onClickRefresh}>영상 새로고침</S.Controller>
          <S.Controller onClick={onClickMoveBefore10Second}>
            - 10초
          </S.Controller>
          <S.Controller onClick={handlePlayVideos}>
            {isPlaying ? "일시정지" : "재생"}
          </S.Controller>
          <S.Controller onClick={onClickMoveAfter10Second}>+ 10초</S.Controller>

          <S.SettingContainer ref={outSide}>
            <S.SettingButton
              onClick={onClickSetting}
              $isSettingOpen={isSettingOpen}
            >
              설정
              {isSettingOpen ? <S.UpArrowIcon /> : <S.DownArrowIcon />}
            </S.SettingButton>
            <S.SettingMenuContainer $isSettingOpen={isSettingOpen}>
              <S.SettingMenu onClick={onClickChangeSequence}>
                재생 순서 변경
              </S.SettingMenu>
            </S.SettingMenuContainer>
          </S.SettingContainer>
        </S.VideoControllerContainer>
        <S.VideoContainer>
          {cameraInfo
            .slice(videoStartIndex, videoEndIndex)
            .map((camera, cam_id) => {
              const videoWithSameCamId = videoList.filter(
                (video) => video.cam_id === camera.cam_id,
              );

              return videoWithSameCamId.map((video) => (
                <S.Video key={camera.cam_id}>
                  <ReactPlayer
                    key={video.cam_id}
                    url={video.stream_url}
                    ref={(ref) => (playerRef.current[cam_id] = ref)}
                    width="95%"
                    height="95%"
                    controls={true}
                    muted={true}
                    playing={isPlaying}
                    onProgress={({ playedSeconds }) => {
                      setPlayTime(playedSeconds);
                    }}
                  />
                  <S.CameraInfo>{camera.cam_name}</S.CameraInfo>
                  {videoStartIndex === 0 && cam_id === 1 && (
                    <S.InvoiceNumber>
                      {displayedBarcodes.length < 1 ? (
                        <p>No Barcode</p>
                      ) : (
                        displayedBarcodes.map((barcode, index) => {
                          const originalIndex = vassList.findIndex(
                            (video) => video.barcode === barcode,
                          );

                          const reversedIndex = vassList.length - originalIndex;

                          if (barcode === nowVassDetail.barcode)
                            return (
                              <p className="sameBarcode" key={index}>
                                {barcode
                                  ? `${reversedIndex}. ${barcode}`
                                  : barcode}
                              </p>
                            );
                          else
                            return (
                              <p key={index}>
                                {barcode
                                  ? `${reversedIndex}. ${barcode}`
                                  : barcode}
                              </p>
                            );
                        })
                      )}
                    </S.InvoiceNumber>
                  )}
                </S.Video>
              ));
            })}
        </S.VideoContainer>
        <S.PaginationContainer>
          <Pagination page={page} setPage={setPage} total={10} limit={5} />
        </S.PaginationContainer>
      </S.Container>
      {isModalOpen && <CameraModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}
