import * as S from "../../styles/Table.styles";
import { ITableProps } from "../../types/Table.types";
import CommonButton from "./CommonButton";
import Loading from "./Loading";

export default function Table({
  title,
  contents,
  columns,
  dateLoading,
  invoiceLoading,
}: ITableProps) {
  console.log("contents", contents);
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
                    <CommonButton
                      contents="상세"
                      onClickFn={() => console.log("dddd")}
                    />
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
