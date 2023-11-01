import { useLocation, useNavigate } from "react-router";
import * as S from "../../styles/Table.styles";
import { ITableProps } from "../../types/Table.types";
import CommonButton from "./CommonButton";
import Loading from "./Loading";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { nowVassDetailState } from "../../stores/vass/nowVassDetailState";
import { IWorkListData } from "../../types/Work.types";
import { prevVassDetailState } from "../../stores/vass/prevVassDetailState";
import { getWorkPage } from "../../utils/getLocationPath";
import { loginState } from "../../stores/loginState";
import { getImageWork } from "../../api/work/getImageWork";
import { useState } from "react";
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
  const [imageUrl, setImageUrl] = useState("");
  const [isDisplayImageModal, setIsDisplayImageModal] = useState(false);

  const { mutate: getImageMutate } = getImageWork(
    setImageUrl,
    setIsDisplayImageModal,
  );

  const navigate = useNavigate();
  const location = useLocation();

  const WORK_PAGE = getWorkPage(location);

  const onClickMoveToDetail = (item: IWorkListData, index: number) => {
    navigate(`/vass/${item.barcode}`);
    setNowVassDetail(item);
    setPrevVassDetail(contents[index + 1]);
  };

  const onClickImage = (item: IWorkListData) => {
    getImageMutate({ barcode: item.barcode, scanDate: item.scandate });
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
        <S.TitleContainer
          $columns={login.camUsable === "2" ? columns : columns + 1}
        >
          {WORK_PAGE && (
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
          {login.camUsable !== "2" && <S.Title>사진</S.Title>}
        </S.TitleContainer>

        <S.ContentsList $isWorkPage={WORK_PAGE}>
          {dateLoading || invoiceLoading ? (
            <Loading />
          ) : (
            contents.map((item, index) => (
              <S.ContentsContainer
                $columns={login.camUsable === "2" ? columns : columns + 1}
                key={item.id}
              >
                {WORK_PAGE && (
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
                {login.camUsable !== "2" && (
                  <S.Contents>
                    <S.CommonButtonContainer>
                      <CommonButton
                        contents="조회"
                        onClickFn={() => onClickImage(item)}
                        backgroundColor="#010163"
                      />
                    </S.CommonButtonContainer>
                  </S.Contents>
                )}
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
    </>
  );
}
