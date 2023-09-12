import * as S from "../../styles/Table.styles";
import { ITableProps } from "../../types/Table.types";

export default function Table({ title, contents, columns }: ITableProps) {
  return (
    <S.Container>
      <S.TitleContainer columns={columns}>
        {title.map((item) => (
          <S.Title key={item}>{item}</S.Title>
        ))}
      </S.TitleContainer>

      <S.ContentsList>
        {contents.map((item) => (
          <S.ContentsContainer columns={columns} key={item}>
            <S.Contents>{item}</S.Contents>
          </S.ContentsContainer>
        ))}
      </S.ContentsList>
    </S.Container>
  );
}
