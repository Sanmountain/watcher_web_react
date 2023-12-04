import { useLocation, useNavigate } from "react-router";
import * as S from "../../styles/Table.styles";
import { ITableProps } from "../../types/Table.types";
import CommonButton from "./CommonButton";
import Loading from "./Loading";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { nowVassDetailState } from "../../stores/vass/nowVassDetailState";
import { IWorkListData } from "../../types/Work.types";
import { prevVassDetailState } from "../../stores/vass/prevVassDetailState";
import { getImagePage, getWorkPage } from "../../utils/getLocationPath";
import { useState } from "react";
import { getImageInImagePage } from "../../api/getImageInImagePage";
import ImageModal from "./ImageModal";
import {
  workLastPageState,
  workPageState,
} from "../../stores/work/workPageState";
import InfiniteScroll from "react-infinite-scroll-component";
import { getWorkDateList } from "../../api/work/getWorkDateList";

export default function Table({
  title,
  contents,
  columns,
  dateLoading,
  invoiceLoading,
  total,
}: ITableProps) {
  const setNowVassDetail = useSetRecoilState(nowVassDetailState);
  const setPrevVassDetail = useSetRecoilState(prevVassDetailState);
  // NOTE 이미지
  const [imageUrl, setImageUrl] = useState("");
  const [isDisplayImageModal, setIsDisplayImageModal] = useState(false);
  // NOTE 페이지네이션
  const [page, setPage] = useRecoilState(workPageState);
  const lastPage = useRecoilValue(workLastPageState);

  const navigate = useNavigate();
  const location = useLocation();

  const WORK_PAGE = getWorkPage(location);
  const IMAGE_PAGE = getImagePage(location);

  const { mutate: workDateListMutate } = getWorkDateList();
  const { mutate: imageMutate, isLoading: isImageLoading } =
    getImageInImagePage(setImageUrl, setIsDisplayImageModal);

  const loadMoreData = () => {
    const nextPage = (Number(page) + 1).toString();
    setPage(nextPage);

    if (Number(lastPage) >= Number(nextPage)) workDateListMutate(nextPage);
  };

  const onClickMoveToDetail = (item: IWorkListData, index: number) => {
    navigate(`/vass/${item.barcode}`);
    setNowVassDetail(item);
    setPrevVassDetail(contents[index + 1]);
  };

  const onClickOpenImageModal = (barcode: string, scanDate: string) => {
    imageMutate({ barcode, scanDate });
  };

  return (
    <>
      <S.Container>
        <S.TitleContainer $columns={columns}>
          {title.map((item) => (
            <S.Title key={item.label}>{item.label}</S.Title>
          ))}
        </S.TitleContainer>

        <S.InfiniteScrollContainer>
          <InfiniteScroll
            dataLength={contents.length}
            next={loadMoreData}
            hasMore={true}
            loader={<Loading />}
            scrollableTarget="scrollableDiv"
          >
            <S.ContentsList $isWorkPage={WORK_PAGE} id="scrollableDiv">
              {dateLoading || invoiceLoading ? (
                <Loading />
              ) : (
                contents.map((item, index) => (
                  <S.ContentsContainer $columns={columns} key={index}>
                    {title.map((el) => (
                      <S.Contents key={el.label}>
                        {!el.value ? (
                          (total || 0) - index
                        ) : IMAGE_PAGE ? (
                          el.value === "button" && item.img_exists ? (
                            <S.CommonButtonContainer>
                              <CommonButton
                                contents="조회"
                                onClickFn={() =>
                                  onClickOpenImageModal(
                                    item.barcode,
                                    item.scandate,
                                  )
                                }
                                backgroundColor="#010163"
                              />
                            </S.CommonButtonContainer>
                          ) : (
                            item[el.value]
                          )
                        ) : el.value === "button" ? (
                          <S.CommonButtonContainer>
                            <CommonButton
                              contents="조회"
                              onClickFn={() => onClickMoveToDetail(item, index)}
                              backgroundColor="#010163"
                            />
                          </S.CommonButtonContainer>
                        ) : (
                          item[el.value]
                        )}
                      </S.Contents>
                    ))}
                  </S.ContentsContainer>
                ))
              )}
            </S.ContentsList>
          </InfiniteScroll>
        </S.InfiniteScrollContainer>
      </S.Container>

      {isDisplayImageModal && (
        <ImageModal
          imageUrl={imageUrl}
          setIsDisplayImageModal={setIsDisplayImageModal}
        />
      )}

      {isImageLoading && <Loading />}
    </>
  );
}
