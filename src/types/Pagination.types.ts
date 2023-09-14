export interface IPaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: (pageNumber: number) => void;
}
