import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronDown, ChevronUp, ChevronRight, Folder } from '@ds/icons';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { Button } from '@ds/button';
import { Tags } from '@ds/tags';
import { Checkbox } from '@ds/checkbox';
import { Flyout, FlyoutFilter, FlyoutFooter } from '@ds/flyout';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TreeNode {
  label: string;
  value: string;
  children?: TreeNode[];
}

export interface TreeFilterProps {
  /** Trigger label shown when no items are selected. */
  label?: string;
  /** Tree of options. Two levels supported (parent + leaf children). */
  options: TreeNode[];
  /** Currently-applied leaf-value selection (controlled). */
  selected?: string[];
  /** Search input placeholder. */
  searchPlaceholder?: string;
  /** "Select all" row label. */
  selectAllLabel?: string;
  /** Disabled trigger. */
  disabled?: boolean;
  /** Fired with the new committed selection when Apply is clicked. */
  onApply?: (selected: string[]) => void;
  /** Fired when the user backs out (Cancel or outside-click). */
  onCancel?: () => void;
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

type CheckboxStatus = 'checked' | 'unchecked' | 'indeterminate';

function leavesOf(node: TreeNode): string[] {
  if (!node.children || node.children.length === 0) return [node.value];
  return node.children.flatMap(leavesOf);
}

function allLeaves(tree: TreeNode[]): string[] {
  return tree.flatMap(leavesOf);
}

function statusOf(leafValues: string[], selected: string[]): CheckboxStatus {
  if (leafValues.length === 0) return 'unchecked';
  const sel = leafValues.filter((v) => selected.includes(v)).length;
  if (sel === 0) return 'unchecked';
  if (sel === leafValues.length) return 'checked';
  return 'indeterminate';
}

// ─── Component ───────────────────────────────────────────────────────────────
//
// TreeFilter is the tree-shaped sibling of Filter. Two-level only — a list
// of parent groups, each with a list of leaf children. Every node has a
// checkbox: a parent's checkbox status is derived from its children
// (checked / unchecked / indeterminate); toggling a parent cascades to
// its leaves. Selection commits to onApply on Apply (same staging-with-
// commit semantics as Filter), discarded on Cancel / outside-close.
//
// Use this anywhere you'd otherwise hand-roll a tree-of-checkboxes flyout.
// For flat option lists, use Filter instead.

export const TreeFilter = React.forwardRef<HTMLButtonElement, TreeFilterProps>(
  function TreeFilter(
    {
      label = 'select',
      options,
      selected,
      searchPlaceholder = 'Filter',
      selectAllLabel = 'All',
      disabled = false,
      onApply,
      onCancel,
      className,
    },
    ref
  ) {
    const prefix = usePrefix();
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const setTriggerRef = useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      },
      [ref]
    );

    const applied = selected ?? [];
    const allLeafValues = useMemo(() => allLeaves(options), [options]);

    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState<string[]>(applied);
    const [search, setSearch] = useState('');
    const [expanded, setExpanded] = useState<Set<string>>(
      () => new Set(options.map((g) => g.value))
    );

    // Reset draft + search whenever the panel opens.
    useEffect(() => {
      if (open) {
        setDraft(applied);
        setSearch('');
      }
      // applied is intentionally not in deps — opening is the trigger.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const allStatus = statusOf(allLeafValues, draft);

    const toggleAll = useCallback(() => {
      setDraft((d) => (d.length === allLeafValues.length ? [] : [...allLeafValues]));
    }, [allLeafValues]);

    const toggleGroup = useCallback((group: TreeNode) => {
      const leaves = leavesOf(group);
      setDraft((d) => {
        const allOn = leaves.every((v) => d.includes(v));
        return allOn
          ? d.filter((v) => !leaves.includes(v))
          : Array.from(new Set([...d, ...leaves]));
      });
    }, []);

    const toggleLeaf = useCallback((value: string) => {
      setDraft((d) =>
        d.includes(value) ? d.filter((v) => v !== value) : [...d, value]
      );
    }, []);

    const toggleExpand = useCallback((value: string) => {
      setExpanded((s) => {
        const next = new Set(s);
        if (next.has(value)) next.delete(value);
        else next.add(value);
        return next;
      });
    }, []);

    const matches = useCallback(
      (text: string) => {
        const q = search.trim().toLowerCase();
        return !q || text.toLowerCase().includes(q);
      },
      [search]
    );

    const handleOpenChange = useCallback(
      (next: boolean) => {
        if (!next && open) {
          onCancel?.();
        }
        setOpen(next);
      },
      [open, onCancel]
    );

    const apply = useCallback(() => {
      onApply?.(draft);
      setOpen(false);
    }, [draft, onApply]);

    const cancel = useCallback(() => {
      onCancel?.();
      setOpen(false);
    }, [onCancel]);

    const labelFor = useCallback(
      (value: string): string => {
        for (const g of options) {
          if (g.value === value) return g.label;
          for (const c of g.children ?? []) {
            if (c.value === value) return c.label;
          }
        }
        return value;
      },
      [options]
    );

    const triggerClasses = classNames(
      `${prefix}--filter`,
      `${prefix}--tree-filter`,
      {
        [`${prefix}--filter--open`]: open,
        [`${prefix}--filter--disabled`]: disabled,
      },
      className
    );

    return (
      <span className={`${prefix}--filter__wrapper`}>
        <button
          ref={setTriggerRef}
          type="button"
          className={triggerClasses}
          aria-haspopup="tree"
          aria-expanded={open}
          disabled={disabled}
          onClick={() => setOpen((v) => !v)}>
          <span className={`${prefix}--filter__label`}>{label}</span>
          {applied.length > 0 && (
            <span
              className={`${prefix}--filter__values`}
              aria-label={`${applied.length} item${applied.length === 1 ? '' : 's'} selected`}>
              <span className={`${prefix}--filter__chip-target`}>
                <Tags
                  label={
                    applied.length === 1
                      ? labelFor(applied[0])
                      : String(applied.length)
                  }
                  color="neutral"
                  contrast="high"
                  size="default"
                />
              </span>
            </span>
          )}
          <span className={`${prefix}--filter__chevron`} aria-hidden="true">
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>

        <Flyout
          open={open}
          onOpenChange={handleOpenChange}
          anchorRef={triggerRef}
          placement="bottom-end">
          <FlyoutFilter
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
          <div className={`${prefix}--tree-filter__tree`} role="tree">
            {/* Select-all row. Sits above the divider so it reads as a master
                control, not "another option named All". */}
            <div
              className={`${prefix}--tree-filter__row ${prefix}--tree-filter__row--root`}
              onClick={toggleAll}
              role="treeitem"
              aria-checked={allStatus === 'checked'}>
              <span className={`${prefix}--tree-filter__chev-spacer`} />
              <Checkbox status={allStatus} label="" tabIndex={-1} />
              <span className={`${prefix}--tree-filter__label ${prefix}--tree-filter__label--bold`}>
                {selectAllLabel}
              </span>
            </div>
            <div className={`${prefix}--tree-filter__divider`} role="separator" />
            {options.map((group) => {
              const visibleChildren = (group.children ?? []).filter((c) => matches(c.label));
              const groupVisible = matches(group.label) || visibleChildren.length > 0;
              if (!groupVisible) return null;
              const isOpen = expanded.has(group.value);
              const groupLeaves = leavesOf(group);
              const gStatus = statusOf(groupLeaves, draft);
              return (
                <div key={group.value} className={`${prefix}--tree-filter__group`} role="group">
                  <div
                    className={`${prefix}--tree-filter__row ${prefix}--tree-filter__row--group`}
                    role="treeitem"
                    aria-expanded={isOpen}>
                    <button
                      type="button"
                      className={`${prefix}--tree-filter__chev`}
                      aria-label={isOpen ? `Collapse ${group.label}` : `Expand ${group.label}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(group.value);
                      }}>
                      {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    <span
                      className={`${prefix}--tree-filter__row-action`}
                      onClick={() => toggleGroup(group)}>
                      <Checkbox status={gStatus} label="" tabIndex={-1} />
                      <span className={`${prefix}--tree-filter__icon`} aria-hidden="true">
                        <Folder size={16} />
                      </span>
                      <span
                        className={`${prefix}--tree-filter__label ${prefix}--tree-filter__label--bold`}>
                        {group.label}
                      </span>
                    </span>
                  </div>
                  {isOpen && visibleChildren.length > 0 && (
                    <div className={`${prefix}--tree-filter__children`}>
                      {visibleChildren.map((leaf) => (
                        <div
                          key={leaf.value}
                          className={`${prefix}--tree-filter__row ${prefix}--tree-filter__row--leaf`}
                          role="treeitem"
                          aria-checked={draft.includes(leaf.value)}
                          onClick={() => toggleLeaf(leaf.value)}>
                          <span className={`${prefix}--tree-filter__chev-spacer`} />
                          <Checkbox
                            status={draft.includes(leaf.value) ? 'checked' : 'unchecked'}
                            label=""
                            tabIndex={-1}
                          />
                          <span className={`${prefix}--tree-filter__label`}>{leaf.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <FlyoutFooter>
            <div className={`${prefix}--filter__footer-actions`}>
              <Button kind="ghost" size="small" onClick={cancel}>
                Cancel
              </Button>
              <Button kind="primary" size="small" onClick={apply}>
                Apply
              </Button>
            </div>
          </FlyoutFooter>
        </Flyout>
      </span>
    );
  }
);

TreeFilter.displayName = 'TreeFilter';

const treeNodeShape: PropTypes.Validator<TreeNode> = (...args) =>
  PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: PropTypes.arrayOf(treeNodeShape as any),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  })(...(args as any));

TreeFilter.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(treeNodeShape).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string.isRequired),
  searchPlaceholder: PropTypes.string,
  selectAllLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  className: PropTypes.string,
};

export default TreeFilter;
