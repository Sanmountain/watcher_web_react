import { useState, memo, useEffect } from "react";
import * as S from "../../styles/Pagination.styles";
import { IPaginationProps } from "../../types/Pagination.types";

function Pagination({ total, limit, page, setPage }: IPaginationProps) {
  const [currentPageGroup, setCurrentPageGroup] = useState(0);

  // NOTE 총 페이지 수
  const numPages = Math.ceil(total / limit);
  // NOTE 한 그룹 당 보여줄 페이지 수
  const pagesPerGroup = 5;
  // NOTE 페이지네이션이 갖고 있는 페이지 그룹의 수
  const numPageGroups = Math.ceil(numPages / pagesPerGroup);

  // NOTE 그룹의 마지막 페이지를 보고 있을 때 다음 그룹으로 넘어갈 경우
  useEffect(() => {
    setCurrentPageGroup(Math.floor(page / pagesPerGroup));
  }, [page, pagesPerGroup]);

  const onClickPrevButton = () => {
    if (
      page + 1 === currentPageGroup * pagesPerGroup + 1 &&
      currentPageGroup > 0
    ) {
      // NOTE 이전 페이지 그룹의 마지막 페이지로 이동
      setPage(currentPageGroup * pagesPerGroup - 1);
      setCurrentPageGroup(currentPageGroup - 1);
    } else {
      // NOTE 이전 페이지로 이동
      setPage(page - 1);
    }
  };

  const onClickNextButton = () => {
    const isAtEndOfCurrentGroup = (page + 1) % pagesPerGroup === 0;
    const isNotLastGroup = currentPageGroup < numPageGroups - 1;

    if (isAtEndOfCurrentGroup && isNotLastGroup) {
      // NOTE 다음 페이지 그룹의 첫 페이지로 이동
      setPage((currentPageGroup + 1) * pagesPerGroup);
      setCurrentPageGroup(currentPageGroup + 1);
    } else {
      // NOTE 다음 페이지로 이동
      setPage(page + 1);
    }
  };

  const onClickPageButton = (index: number) => {
    const actualPageIndex = currentPageGroup * pagesPerGroup + index;
    setPage(actualPageIndex);
  };

  return (
    <S.Container>
      <S.PaginationButton onClick={onClickPrevButton} disabled={page === 0}>
        <S.PrevIcon />
      </S.PaginationButton>
      {Array(numPages)
        .fill(0)
        .slice(
          currentPageGroup * pagesPerGroup,
          (currentPageGroup + 1) * pagesPerGroup,
        )
        .map((_, index) => {
          return (
            <S.PaginationButton
              key={index}
              onClick={() => onClickPageButton(index)}
              aria-current={page + 1 === index + 1 ? "page" : undefined}
            >
              {index + 1}
            </S.PaginationButton>
          );
        })}
      <S.PaginationButton
        onClick={onClickNextButton}
        disabled={page === numPages - 1}
      >
        <S.NextIcon />
      </S.PaginationButton>
    </S.Container>
  );
}

export default memo(Pagination);
