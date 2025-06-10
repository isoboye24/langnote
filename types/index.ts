export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type WordCaseType = {
  id: string;
  caseName: string;
};
