import React from 'react';
import PropTypes from 'prop-types';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { useFlyoutContext } from './Flyout';

export interface FilterProps {
  placeholder?: string;
  /** Auto-focus on flyout open. Default true — finance/sales users open
   *  filterable flyouts to type, not to mouse around first. */
  autoFocus?: boolean;
  /** Controlled value. When provided alongside onChange, overrides internal flyout filter state. */
  value?: string;
  /** Controlled change handler. Receives the raw input event. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Filter = React.forwardRef<HTMLInputElement, FilterProps>(
  function Filter({ placeholder = 'Filter', autoFocus = true, value, onChange }, ref) {
    const prefix = usePrefix();
    const { filter, setFilter } = useFlyoutContext();
    const isControlled = value !== undefined && onChange !== undefined;
    const inputValue = isControlled ? value : filter;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isControlled) {
        onChange(e);
      } else {
        setFilter(e.target.value);
      }
    };

    return (
      <>
        <div className={`${prefix}--flyout__filter`}>
          <input
            ref={ref}
            type="text"
            className={`${prefix}--flyout__filter-input`}
            value={inputValue}
            onChange={handleChange}
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
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;
