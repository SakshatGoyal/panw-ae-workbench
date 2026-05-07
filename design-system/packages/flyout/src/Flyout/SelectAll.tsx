import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@ds/checkbox';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { useFlyoutContext } from './Flyout';

export interface SelectAllProps {
  label?: string;
}

/**
 * Tri-state Select-All row for multi-select flyouts. Sits above the list
 * (Stage flyout pattern: top action row inside the padded container).
 *
 *   none registered selected   → unchecked
 *   all registered selected    → checked
 *   some                       → indeterminate
 *
 * Click toggles between "all" and "none" (when indeterminate, click selects
 * all — common spreadsheet-y pattern).
 */
export const SelectAll = React.forwardRef<HTMLDivElement, SelectAllProps>(
  function SelectAll({ label = 'Select all' }, ref) {
    const prefix = usePrefix();
    const { mode, selected, registered, selectAll, selectNone } = useFlyoutContext();

    if (mode !== 'multiple') return null;

    const total = registered.size;
    const chosen = Array.from(registered).filter((v) => selected.has(v)).length;
    const status =
      chosen === 0
        ? 'unchecked'
        : chosen === total
          ? 'checked'
          : 'indeterminate';

    const handleToggle = () => {
      if (status === 'checked') selectNone();
      else selectAll();
    };

    return (
      <div
        ref={ref}
        className={`${prefix}--flyout__select-all`}
        role="option"
        aria-selected={status === 'checked'}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
        tabIndex={0}>
        <span className={`${prefix}--flyout__select-all-checkbox`} aria-hidden="true">
          <Checkbox
            id="flyout-select-all"
            labelText=""
            status={status}
            onChange={handleToggle}
            tabIndex={-1}
          />
        </span>
        <span className={`${prefix}--flyout__select-all-label`}>{label}</span>
      </div>
    );
  }
);

SelectAll.displayName = 'Flyout.SelectAll';

SelectAll.propTypes = {
  label: PropTypes.string,
};

export default SelectAll;
