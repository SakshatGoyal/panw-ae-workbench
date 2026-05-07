import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { Button, IconButton } from '@ds/button';
import { Dropdown } from '@ds/dropdown';

export interface PaginationProps {
  totalItems: number;
  currentPage?: number;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  showItemsPerPage?: boolean;
  background?: 'grey10' | 'grey00';
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  /** Maximum number of visible page buttons (excluding ellipsis). */
  maxVisiblePages?: number;
  className?: string;
}

function getPageRange(currentPage: number, totalPages: number, maxVisible: number): (number | null)[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | null)[] = [];
  const half = Math.floor((maxVisible - 2) / 2);
  let start = currentPage - half;
  let end = currentPage + half;
  if (start < 2) {
    start = 2;
    end = start + maxVisible - 3;
  }
  if (end > totalPages - 1) {
    end = totalPages - 1;
    start = end - maxVisible + 3;
  }
  if (start < 2) start = 2;
  pages.push(1);
  if (start > 2) pages.push(null);
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push(null);
  if (totalPages > 1) pages.push(totalPages);
  return pages;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  function Pagination(
    {
      totalItems,
      currentPage = 1,
      rowsPerPage = 10,
      rowsPerPageOptions = [10, 25, 50, 100],
      showItemsPerPage = true,
      background = 'grey00',
      onPageChange,
      onRowsPerPageChange,
      maxVisiblePages = 10,
      className,
    },
    ref
  ) {
    const prefix = usePrefix();
    const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
    const safeCurrent = Math.min(Math.max(1, currentPage), totalPages);

    const pages = useMemo(
      () => getPageRange(safeCurrent, totalPages, maxVisiblePages),
      [safeCurrent, totalPages, maxVisiblePages]
    );

    const isFirst = safeCurrent === 1;
    const isLast = safeCurrent === totalPages;

    const goTo = useCallback(
      (page: number) => {
        if (page >= 1 && page <= totalPages && page !== safeCurrent) {
          onPageChange?.(page);
        }
      },
      [totalPages, safeCurrent, onPageChange]
    );

    const dropdownOptions = useMemo(
      () => rowsPerPageOptions.map((n) => ({ label: String(n), value: String(n) })),
      [rowsPerPageOptions]
    );

    const handleRowsChange = useCallback(
      (value: string) => {
        const num = parseInt(value, 10);
        if (!isNaN(num)) onRowsPerPageChange?.(num);
      },
      [onRowsPerPageChange]
    );

    return (
      <div ref={ref} className={classNames(`${prefix}--pagination`, className)}>
        <div className={`${prefix}--pagination__page-numbers`}>
          <IconButton
            kind="ghost"
            size="sm"
            iconSize={16}
            shape="square"
            renderIcon={ChevronsLeft}
            aria-label="First page"
            disabled={isFirst}
            onClick={() => goTo(1)}
          />
          <IconButton
            kind="ghost"
            size="sm"
            iconSize={16}
            shape="square"
            renderIcon={ChevronLeft}
            aria-label="Previous page"
            disabled={isFirst}
            onClick={() => goTo(safeCurrent - 1)}
          />
          {pages.map((page, idx) =>
            page === null ? (
              <span key={`ellipsis-${idx}`} className={`${prefix}--pagination__ellipsis`}>
                …
              </span>
            ) : (
              <Button
                key={page}
                kind="ghost-accent"
                size="small"
                shape="pill"
                aria-current={page === safeCurrent ? 'page' : undefined}
                aria-label={`Page ${page}`}
                onClick={() => goTo(page)}>
                {String(page).padStart(2, '0')}
              </Button>
            )
          )}
          <IconButton
            kind="ghost"
            size="sm"
            iconSize={16}
            shape="square"
            renderIcon={ChevronRight}
            aria-label="Next page"
            disabled={isLast}
            onClick={() => goTo(safeCurrent + 1)}
          />
          <IconButton
            kind="ghost"
            size="sm"
            iconSize={16}
            shape="square"
            renderIcon={ChevronsRight}
            aria-label="Last page"
            disabled={isLast}
            onClick={() => goTo(totalPages)}
          />
        </div>

        {showItemsPerPage && (
          <div className={`${prefix}--pagination__items-per-page`}>
            <span className={`${prefix}--pagination__items-per-page-label`}>Items per page</span>
            <div className={`${prefix}--pagination__dropdown-wrapper`}>
              <Dropdown
                background={background}
                size="default"
                showTitle={false}
                showDescription={false}
                placeholder="###"
                options={dropdownOptions}
                selectedValue={String(rowsPerPage)}
                onChange={handleRowsChange}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  showItemsPerPage: PropTypes.bool,
  background: PropTypes.oneOf(['grey10', 'grey00']),
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  maxVisiblePages: PropTypes.number,
  className: PropTypes.string,
};

export default Pagination;
