import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AngleDoubleLeft as ChevronFirst, ChevronLeft, ChevronRight, AngleDoubleRight as ChevronLast } from '@ds/icons';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { IconButton } from '@ds/button';
import { Dropdown } from '@ds/dropdown';

// ─── Pagination — Ledger style ───────────────────────────────────────────────
//
// The aesthetic borrows from financial / Bloomberg-style status bars: hairline
// rule above, dense single-line layout, all-caps tracked-out captions, and
// tabular numerals throughout. The interactive surface is composed entirely
// of design-system components — IconButton chevrons for first/prev/next/last,
// and Dropdown for rows-per-page — so the component lives inside the system,
// not next to it.
//
// What's gone from the previous version: numbered page buttons (01 02 03 …
// 12). For finance/sales/accounting users on tables of 100s–1000s of records,
// numbered buttons translate poorly to "where am I in this dataset?" The
// Ledger surfaces records and range directly: "1–25 of 1,247 records."

export interface PaginationProps {
  totalItems: number;
  currentPage?: number;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  showItemsPerPage?: boolean;
  background?: 'grey10' | 'grey00';
  /** Singular noun for the records (e.g. "deal", "invoice"). Defaults to "record". */
  recordLabel?: string;
  /** Plural noun. Defaults to `${recordLabel}s`. */
  recordLabelPlural?: string;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  className?: string;
}

const fmt = (n: number) => n.toLocaleString('en-US');

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  function Pagination(
    {
      totalItems,
      currentPage = 1,
      rowsPerPage = 10,
      rowsPerPageOptions = [10, 25, 50, 100],
      showItemsPerPage = true,
      background = 'grey00',
      recordLabel = 'record',
      recordLabelPlural,
      onPageChange,
      onRowsPerPageChange,
      className,
    },
    ref
  ) {
    const prefix = usePrefix();
    const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
    const safeCurrent = Math.min(Math.max(1, currentPage), totalPages);
    const isFirst = safeCurrent === 1;
    const isLast = safeCurrent === totalPages;

    const rangeStart = totalItems === 0 ? 0 : (safeCurrent - 1) * rowsPerPage + 1;
    const rangeEnd = Math.min(safeCurrent * rowsPerPage, totalItems);
    const plural = recordLabelPlural ?? `${recordLabel}s`;
    const recordsNoun = totalItems === 1 ? recordLabel : plural;

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
        {/* Range read-out: "1–25 of 1,247 records" — caption-styled status text. */}
        <span className={`${prefix}--pagination__range`}>
          <span className={`${prefix}--pagination__range-numbers`}>
            {fmt(rangeStart)}–{fmt(rangeEnd)}
          </span>
          <span className={`${prefix}--pagination__range-sep`}>of</span>
          <span className={`${prefix}--pagination__range-numbers`}>{fmt(totalItems)}</span>
          <span className={`${prefix}--pagination__range-sep`}>{recordsNoun}</span>
        </span>

        {/* Nav cluster: chevron icons flanking the page indicator. */}
        <div className={`${prefix}--pagination__nav`}>
          <IconButton
            kind="ghost"
            size="sm"
            iconSize={20}
            renderIcon={ChevronFirst}
            aria-label="First page"
            disabled={isFirst}
            onClick={() => goTo(1)}
          />
          <IconButton
            kind="ghost"
            size="sm"
            iconSize={20}
            renderIcon={ChevronLeft}
            aria-label="Previous page"
            disabled={isFirst}
            onClick={() => goTo(safeCurrent - 1)}
          />
          <span className={`${prefix}--pagination__page-indicator`}>
            <span className={`${prefix}--pagination__range-sep`}>page</span>
            <span className={`${prefix}--pagination__page-current`}>{safeCurrent}</span>
            <span className={`${prefix}--pagination__range-sep`}>of</span>
            <span className={`${prefix}--pagination__page-total`}>{totalPages}</span>
          </span>
          <IconButton
            kind="ghost"
            size="sm"
            iconSize={20}
            renderIcon={ChevronRight}
            aria-label="Next page"
            disabled={isLast}
            onClick={() => goTo(safeCurrent + 1)}
          />
          <IconButton
            kind="ghost"
            size="sm"
            iconSize={20}
            renderIcon={ChevronLast}
            aria-label="Last page"
            disabled={isLast}
            onClick={() => goTo(totalPages)}
          />
        </div>

        {/* Rows per page — DS Dropdown sized small to fit the dense row. */}
        {showItemsPerPage && (
          <div className={`${prefix}--pagination__items-per-page`}>
            <span className={`${prefix}--pagination__items-per-page-label`}>Rows per page</span>
            <div className={`${prefix}--pagination__dropdown-wrapper`}>
              <Dropdown
                background={background}
                size="small"
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
  recordLabel: PropTypes.string,
  recordLabelPlural: PropTypes.string,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  className: PropTypes.string,
};

export default Pagination;
