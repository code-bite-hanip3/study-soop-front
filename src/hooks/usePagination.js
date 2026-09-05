// 강사님(usePagenation.js) 코드 그대로 가져온 pagination 훅
import { useState } from 'react';

const INITIAL_TOTAL_COUNT = 0;

export const usePagination = (initialPage = 1, itemsPerPage = 10) => {
  const [totalCount, setTotalCount] = useState(INITIAL_TOTAL_COUNT);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const goToPage = (selectedPage) => {
    if (selectedPage < 1 || selectedPage > totalPages) {
      console.log('페이지 선택이 잘못되었습니다.');
      return;
    }

    setCurrentPage(selectedPage);
  };

  return {
    totalCount,
    currentPage,
    totalPages,
    setTotalCount,
    goToPage,
  };
};