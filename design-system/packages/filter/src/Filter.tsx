import * as React from 'react';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from '@ds/icons';
import { Tags } from '@ds/tags';
import { Button } from '@ds/button';
import {
  Flyout,
  FlyoutList,
  FlyoutItem,
  FlyoutFooter,
} from '@ds/flyout';
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
}

/**
 * Filter — button trigger that opens a Flyout of options with Apply / Cancel
 * commit semantics. Composes @ds/flyout for the popover so the panel inherits
 * the Stage flyout primitive's width, item rhythm, motion entrance, hover
 * tokens, divider, truncation, and shadow — everything authored in the
 * flyout pass. Trigger is hand-rolled for the chip-style affordance (label,
 * count chip, chevron) which is unique to filter buttons.
 *
 * Selection is staged in `draft` state so onSelectionChange-per-click is
 * absorbed locally and only Apply commits via onApply. Outside-click,
 * Escape, and Cancel all close without committing — Flyout owns the first
 * two; Cancel is a Footer button. When the flyout reopens, draft resets
 * to the prop value.
 */
export const Filter = React.forwardRef<HTMLButtonElement, FilterProps>(
  function Filter({ label, options, selected, onApply, className }, ref) {
    const [open, setOpen] = React.useState(false);
    const [draft, setDraft] = React.useState<string[]>(selected);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const setRef = (node: HTMLButtonElement | null) => {
      triggerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    };

    // Reset draft to current selection each time the flyout opens, so cancel /
    // outside-click / escape effectively discard pending edits.
    React.useEffect(() => {
      if (open) setDraft(selected);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const apply = () => {
      onApply(draft);
      setOpen(false);
    };

    return (
      <span className={classNames('panw--filter__wrapper', className)}>
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
              <Tags
                label={String(selected.length)}
                color="neutral"
                contrast="high"
                size="default"
              />
            </span>
          )}
          <span className="panw--filter__chevron" aria-hidden="true">
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>

        <Flyout
          open={open}
          onOpenChange={setOpen}
          anchorRef={triggerRef}
          mode="multiple"
          selected={draft}
          onSelectionChange={setDraft}
          placement="bottom-start">
          <FlyoutList>
            {options.map((opt) => (
              <FlyoutItem key={opt.value} value={opt.value}>
                {opt.label}
              </FlyoutItem>
            ))}
          </FlyoutList>
          <FlyoutFooter>
            <Button kind="ghost" size="small" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button kind="primary" size="small" onClick={apply}>
              Apply
            </Button>
          </FlyoutFooter>
        </Flyout>
      </span>
    );
  }
);

Filter.displayName = 'Filter';
