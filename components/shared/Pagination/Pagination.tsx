import { DEFAULT_LIMIT } from '@constants/constants';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import s from './Pagination.module.scss';

interface PaginationProps {
  selectedPage: number;
  onChangePage: (page: number) => void;
  total: number;
  limit?: number;
  className?: string;
}

export const Pagination: FC<PaginationProps> = ({
  total,
  limit = DEFAULT_LIMIT,
  onChangePage,
  selectedPage,
  className,
}) => {
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPageCount(Math.ceil(total / limit));
  }, [total, limit]);

  if (pageCount < 2) {
    return null;
  }

  return (
    <ReactPaginate
      onPageChange={({ selected }: { selected: number }) =>
        onChangePage(selected)
      }
      forcePage={selectedPage}
      previousLabel={''}
      nextLabel={''}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      pageClassName={s.page}
      pageLinkClassName={s.pageLink}
      previousClassName={s.prev}
      nextClassName={s.next}
      breakLabel="..."
      breakClassName={clsx(s.page, s.break)}
      breakLinkClassName={s.pageLink}
      activeClassName={s.activePage}
      className={clsx(s.pagination, className)}
    />
  );
};
