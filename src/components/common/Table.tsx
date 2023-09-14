import { useNavigate } from "react-router";
import * as S from "../../styles/Table.styles";
import { ITableProps } from "../../types/Table.types";
import CommonButton from "./CommonButton";
import Loading from "./Loading";
import { useSetRecoilState } from "recoil";
import { nowVassDetailState } from "../../stores/vass/nowVassDetailState";
import { IWorkListData } from "../../types/Work.types";
import { prevVassDetailState } from "../../stores/vass/prevVassDetailState";

export default function Table({
  title,
  contents,
  columns,
  dateLoading,
  invoiceLoading,
}: ITableProps) {
  const setNowVassDetail = useSetRecoilState(nowVassDetailState);
  const setPrevVassDetail = useSetRecoilState(prevVassDetailState);

  const navigate = useNavigate();

  const onClickMoveToDetail = (item: IWorkListData, index: number) => {
    navigate(`/vass/${item.barcode}`);
    setNowVassDetail(item);
    setPrevVassDetail(contents[index + 1]);
  };

  return (
    <S.Container>
      <S.TitleContainer columns={columns}>
        {title.map((item) => (
          <S.Title key={item.label}>{item.label}</S.Title>
        ))}
      </S.TitleContainer>

      <S.ContentsList>
        {dateLoading || invoiceLoading ? (
          <Loading />
        ) : (
          contents.map((item, index) => (
            <S.ContentsContainer columns={columns} key={item.id}>
              {title.map((el) => (
                <S.Contents key={el.label}>
                  {!el.value ? (
                    index + 1
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
            </S.ContentsContainer>
          ))
        )}
      </S.ContentsList>
    </S.Container>
  );
}
