import { useLocation, useNavigate } from "react-router";
import * as S from "../../styles/Table.styles";
import { ITableProps } from "../../types/Table.types";
import CommonButton from "./CommonButton";
import Loading from "./Loading";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { nowVassDetailState } from "../../stores/vass/nowVassDetailState";
import { IWorkListData } from "../../types/Work.types";
import { prevVassDetailState } from "../../stores/vass/prevVassDetailState";
import { getImagePage, getWorkPage } from "../../utils/getLocationPath";
import { loginState } from "../../stores/loginState";
import { useState } from "react";
import { getImageInImagePage } from "../../api/getImageInImagePage";
import ImageModal from "./ImageModal";

export default function Table({
  title,
  contents,
  columns,
  dateLoading,
  invoiceLoading,
  checkedItems,
  setCheckedItems,
  allChecked,
  setAllChecked,
}: ITableProps) {
  const setNowVassDetail = useSetRecoilState(nowVassDetailState);
  const setPrevVassDetail = useSetRecoilState(prevVassDetailState);
  const login = useRecoilValue(loginState);
  // NOTE 이미지
  const [imageUrl, setImageUrl] = useState("");
  const [isDisplayImageModal, setIsDisplayImageModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const WORK_PAGE = getWorkPage(location);
  const IMAGE_PAGE = getImagePage(location);

  const { mutate: imageMutate, isLoading: isImageLoading } =
    getImageInImagePage(setImageUrl, setIsDisplayImageModal);

  const onClickMoveToDetail = (item: IWorkListData, index: number) => {
    navigate(`/vass/${item.barcode}`);
    setNowVassDetail(item);
    setPrevVassDetail(contents[index + 1]);
  };

  const onClickOpenImageModal = (barcode: string, scanDate: string) => {
    imageMutate({ barcode, scanDate });
  };

  // NOTE 체크박스 전체 선택,해제
  const handleCheckAll = () => {
    if (setCheckedItems && setAllChecked) {
      if (allChecked) {
        setCheckedItems([]);
      } else {
        const newCheckedItems = contents.map((item) => ({
          barcode: item.barcode,
          scandate: item.scandate,
        }));
        setCheckedItems(newCheckedItems);
      }
      setAllChecked(!allChecked);
    }
  };

  // NOTE 체크박스 개별 선택,해제
  const handleCheckItem = (barcode: string, scandate: string) => {
    if (checkedItems && setCheckedItems && setAllChecked) {
      const newCheckedItems = checkedItems.some(
        (item) => item.barcode === barcode && item.scandate === scandate,
      )
        ? checkedItems.filter(
            (item) => item.barcode !== barcode || item.scandate !== scandate,
          )
        : [...checkedItems, { barcode, scandate }];

      setCheckedItems(newCheckedItems);

      // NOTE 모든 checkbox 체크 된 경우 전체 선택 체크박스 체크
      setAllChecked(newCheckedItems.length === contents.length);
    }
  };

  return (
    <>
      <S.Container>
        <S.TitleContainer $columns={columns}>
          {WORK_PAGE &&
            (login.company === "LOGEN" || login.company === "LOTTE") && (
              <S.Title>
                <input
                  type="checkbox"
                  id="checkAll"
                  checked={allChecked}
                  disabled={contents.length < 1}
                  onChange={handleCheckAll}
                />
              </S.Title>
            )}
          {title.map((item) => (
            <S.Title key={item.label}>{item.label}</S.Title>
          ))}
        </S.TitleContainer>

        <S.ContentsList $isWorkPage={WORK_PAGE}>
          {dateLoading || invoiceLoading ? (
            <Loading />
          ) : (
            contents.map((item, index) => (
              <S.ContentsContainer $columns={columns} key={item.id}>
                {WORK_PAGE &&
                  (login.company === "LOGEN" || login.company === "LOTTE") && (
                    <S.Contents>
                      <input
                        type="checkbox"
                        id={`checkbox-${item.id}`}
                        checked={checkedItems?.some(
                          (checkedItem) =>
                            checkedItem.barcode === item.barcode &&
                            checkedItem.scandate === item.scandate,
                        )}
                        onChange={() =>
                          handleCheckItem(item.barcode, item.scandate)
                        }
                      />
                    </S.Contents>
                  )}
                {title.map((el) => (
                  <S.Contents key={el.label}>
                    {!el.value ? (
                      contents.length - index
                    ) : IMAGE_PAGE ? (
                      el.value === "button" && item.img_exists ? (
                        <S.CommonButtonContainer>
                          <CommonButton
                            contents="조회"
                            onClickFn={() =>
                              onClickOpenImageModal(item.barcode, item.scandate)
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
