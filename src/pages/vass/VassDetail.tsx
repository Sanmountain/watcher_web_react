import { useEffect, useRef, useState } from "react";
import * as S from "../../styles/VassDetail.styles";
import Pagination from "../../components/common/Pagination";
import ReactPlayer from "react-player";
import CameraModal from "../../components/common/CameraModal";
import modalClose from "../../utils/modalClose";

export default function VassDetail() {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [isPlaying] = useState(true);

  const outSide = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    modalClose(isSettingOpen, setIsSettingOpen, outSide);
  }, [isSettingOpen]);

  const onClickSetting = () => {
    setIsSettingOpen(!isSettingOpen);
  };

  const onClickChangeSequence = () => {
    setIsModalOpen(true);
    setIsSettingOpen(false);
  };

  return (
    <>
      <S.Container>
        <S.VideoControllerContainer>
          <S.Controller>영상 새로고침</S.Controller>
          <S.Controller>- 10초</S.Controller>
          <S.Controller>일시정지</S.Controller>
          <S.Controller>+ 10초</S.Controller>

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
          <S.Video>
            <ReactPlayer
              url="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
              width="85%"
              height="98%"
              controls={true}
              muted={true}
              playing={isPlaying}
            />
            <S.CameraInfo>오토스캐너 START</S.CameraInfo>
            <S.InvoiceNumber>
              <p>1. 123456789</p>
              <p className="sameBarcode">1. 123456789</p>
            </S.InvoiceNumber>
          </S.Video>
          <S.Video>
            <ReactPlayer
              url="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
              width="85%"
              height="98%"
              controls={true}
              muted={true}
              playing={isPlaying}
            />
            <S.CameraInfo>오토스캐너 START</S.CameraInfo>
          </S.Video>
          <S.Video>
            <ReactPlayer
              url="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
              width="85%"
              height="98%"
              controls={true}
              muted={true}
              playing={isPlaying}
            />
            <S.CameraInfo>오토스캐너 START</S.CameraInfo>
          </S.Video>
          <S.Video>
            <ReactPlayer
              url="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
              width="85%"
              height="98%"
              controls={true}
              muted={true}
              playing={isPlaying}
            />
            <S.CameraInfo>오토스캐너 START</S.CameraInfo>
          </S.Video>
        </S.VideoContainer>
        <S.PaginationContainer>
          <Pagination page={page} setPage={setPage} total={10} limit={5} />
        </S.PaginationContainer>
      </S.Container>
      {isModalOpen && <CameraModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}
