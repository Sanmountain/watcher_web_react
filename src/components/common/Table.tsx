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

  const onClickImage = (item: any) => {
    getImageMutate(item.barcode);
  };

  return (
    <>
      <S.Container>
        <S.TitleContainer
          columns={login.camUsable === "2" ? columns : columns + 1}
        >
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
                columns={login.camUsable === "2" ? columns : columns + 1}
                key={item.id}
              >
                {title.map((el) => (
                  <S.Contents key={el.label}>
                    {!el.value ? (
                      contents.length - index
                    ) : el.value === "button" ? (
                      <S.CommonButtonContainer>
                        <CommonButton
                          contents="조회"
                          onClickFn={() => onClickMoveToDetail(item, index)}
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
