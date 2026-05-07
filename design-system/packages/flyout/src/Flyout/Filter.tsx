import React from 'react';
import PropTypes from 'prop-types';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { useFlyoutContext } from './Flyout';

export interface FilterProps {
  placeholder?: string;
  /** Auto-focus on flyout open. Default true — finance/sales users open
   *  filterable flyouts to type, not to mouse around first. */
  autoFocus?: boolean;
}

export const Filter = React.forwardRef<HTMLInputElement, FilterProps>(
  function Filter({ placeholder = 'Filter', autoFocus = true }, ref) {
    const prefix = usePrefix();
    const { filter, setFilter } = useFlyoutContext();

    return (
      <>
        <div className={`${prefix}--flyout__filter`}>
          <input
            ref={ref}
            type="text"
            className={`${prefix}--flyout__filter-input`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            aria-label={placeholder}
          />
        </div>
        <div className={`${prefix}--flyout__divider`} role="separator" aria-hidden="true" />
      </>
    );
  }
);

Filter.displayName = 'Flyout.Filter';

Filter.propTypes = {
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export default Filter;
