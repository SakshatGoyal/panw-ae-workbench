import * as React from 'react';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from '@ds/icons';
import { Tags } from '@ds/tags';
import { Checkbox } from '@ds/checkbox';
import { Button } from '@ds/button';
import './filter.css';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterProps {
  label: string;
  options: FilterOption[];
  selected: string[];
  onApply: (values: string[]) => void;
  className?: string;
  /** Optional explicit width for the popover panel. Defaults to 240px. */
  panelWidth?: number;
}

/**
 * Filter — button trigger that opens a popover with checkbox options and
 * Apply / Cancel commit semantics. Matches the spec described in
 * stage-components.md and the visual pattern of the ProductFilter helper
 * in compositions/opportunity-table.
 *
 * Composition:
 *   • Trigger button: label, optional count chip (Tags neutral/high), chevron
 *   • Popover: checkbox list of options + footer with Cancel / Apply
 *
 * Selection is staged in `draft` state; only Apply commits via onApply. Cancel
 * resets to the prop value. Outside-click / escape behave as Cancel.
 */
export const Filter = React.forwardRef<HTMLButtonElement, FilterProps>(
  function Filter(
    { label, options, selected, onApply, className, panelWidth = 240 },
    ref
  ) {
    const [open, setOpen] = React.useState(false);
    const [draft, setDraft] = React.useState<string[]>(selected);
    const wrapperRef = React.useRef<HTMLSpanElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const setRef = (node: HTMLButtonElement | null) => {
      triggerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    };

    React.useEffect(() => {
      if (open) setDraft(selected);
    }, [open, selected]);

    React.useEffect(() => {
      if (!open) return;
      const onDocClick = (e: MouseEvent) => {
        if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      document.addEventListener('mousedown', onDocClick);
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('mousedown', onDocClick);
        document.removeEventListener('keydown', onKey);
      };
    }, [open]);

    const toggle = (value: string) =>
      setDraft((d) =>
        d.includes(value) ? d.filter((v) => v !== value) : [...d, value]
      );

    const apply = () => {
      onApply(draft);
      setOpen(false);
    };
    const cancel = () => setOpen(false);

    return (
      <span ref={wrapperRef} className={classNames('panw--filter__wrapper', className)}>
        <button
          ref={setRef}
          type="button"
          className={classNames('panw--filter', { 'panw--filter--open': open })}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}>
          <span className="panw--filter__label">{label}</span>
          {selected.length > 0 && (
            <span className="panw--filter__values">
              <Tags label={String(selected.length)} color="neutral" contrast="high" size="default" />
            </span>
          )}
          <span className="panw--filter__chevron" aria-hidden="true">
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>

        {open && (
          <div
            className="panw--filter__panel"
            role="dialog"
            aria-label={`${label} filter`}
            style={{ width: panelWidth }}>
            <div className="panw--filter__list" role="listbox" aria-multiselectable="true">
              {options.map((opt) => {
                const checked = draft.includes(opt.value);
                return (
                  <div
                    key={opt.value}
                    className="panw--filter__item"
                    role="option"
                    aria-selected={checked}
                    onClick={() => toggle(opt.value)}>
                    <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      label=""
                      tabIndex={-1}
                    />
                    <span className="panw--filter__item-label">{opt.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="panw--filter__footer">
              <Button kind="ghost" size="small" onClick={cancel}>Cancel</Button>
              <Button kind="primary" size="small" onClick={apply}>Apply</Button>
            </div>
          </div>
        )}
      </span>
    );
  }
);

Filter.displayName = 'Filter';
