import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxEmpty, CheckboxFilled, CheckboxIndeterminate } from '@ds/icons';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { useFlyoutContext } from './Flyout';

export interface SelectAllProps {
  /** Optional aria-label override. Defaults to 'Select all'. */
  ariaLabel?: string;
}

/**
 * Icon-only Select-All header for multi-select flyouts. The convention is
 * established by position alone: a checkbox glyph sitting above a column of
 * checkbox-equipped items implies "select all". No visible label needed.
 *
 * Tri-state behavior:
 *   none registered selected   → empty square; click → select all
 *   some registered selected   → minus square (indeterminate); click → clear
 *   all registered selected    → check square; click → clear
 *
 * Followed implicitly by a divider — the SelectAll header always sits above
 * a 1px line per Stage's flyout pattern. Consumers don't render the divider.
 */
export const SelectAll = React.forwardRef<HTMLDivElement, SelectAllProps>(
  function SelectAll({ ariaLabel = 'Select all' }, ref) {
    const prefix = usePrefix();
    const { mode, selected, registered, selectAll, selectNone } = useFlyoutContext();

    if (mode !== 'multiple') return null;

    const total = registered.size;
    const chosen = Array.from(registered).filter((v) => selected.has(v)).length;
    const status: 'unchecked' | 'checked' | 'indeterminate' =
      chosen === 0
        ? 'unchecked'
        : chosen === total
          ? 'checked'
          : 'indeterminate';

    const handleToggle = () => {
      // Clicking when checked OR indeterminate clears; clicking when
      // unchecked selects everything.
      if (status === 'unchecked') selectAll();
      else selectNone();
    };

    const Icon =
      status === 'checked' ? CheckboxFilled : status === 'indeterminate' ? CheckboxIndeterminate : CheckboxEmpty;

    return (
      <>
        <div
          ref={ref}
          className={`${prefix}--flyout__select-all`}
          role="option"
          aria-selected={status === 'checked'}
          aria-checked={status === 'indeterminate' ? 'mixed' : status === 'checked'}
          aria-label={ariaLabel}
          tabIndex={0}
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggle();
            }
          }}>
          <span className={`${prefix}--flyout__select-all-glyph`} aria-hidden="true">
            <Icon size={16} />
          </span>
        </div>
        <div className={`${prefix}--flyout__divider`} role="separator" aria-hidden="true" />
      </>
    );
  }
);

SelectAll.displayName = 'Flyout.SelectAll';

SelectAll.propTypes = {
  ariaLabel: PropTypes.string,
};

export default SelectAll;
