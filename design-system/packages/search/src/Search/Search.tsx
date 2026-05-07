import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Search as SearchGlyph, X } from 'lucide-react';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { IconButton } from '@ds/button';

export const SearchSizes = ['sm', 'md', 'lg'] as const;
export type SearchSize = (typeof SearchSizes)[number];

export const SearchBackgrounds = ['grey10', 'grey0'] as const;
export type SearchBackground = (typeof SearchBackgrounds)[number];

export const SearchShapes = ['standard', 'rounded', 'pill'] as const;
export type SearchShape = (typeof SearchShapes)[number];

export const SearchForceStates = ['hover', 'onclick', 'active', 'disabled'] as const;
export type SearchForceState = (typeof SearchForceStates)[number];

export interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: SearchSize;
  background?: SearchBackground;
  shape?: SearchShape;
  forceState?: SearchForceState | null;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  /** Override the leading search glyph. Pass an ElementType. */
  renderSearchIcon?: React.ElementType;
}

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  function Search(
    {
      size = 'md',
      background = 'grey10',
      shape = 'rounded',
      forceState = null,
      value: controlledValue,
      onChange,
      onClear,
      disabled,
      placeholder = 'Search',
      className,
      onFocus,
      onBlur,
      renderSearchIcon: SearchIconElement = SearchGlyph,
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();
    const [internal, setInternal] = useState('');
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const isControlled = controlledValue !== undefined;
    const current = isControlled ? controlledValue : internal;
    const isActive = focused || (current?.length ?? 0) > 0;
    const isDisabled = disabled || forceState === 'disabled';

    const setRef = useCallback(
      (node: HTMLInputElement | null) => {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternal(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) setInternal('');
      onClear?.();
      inputRef.current?.focus();
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    };

    const rootClass = classNames(
      `${prefix}--search`,
      `${prefix}--search--${size}`,
      `${prefix}--search--${background}`,
      `${prefix}--search--${shape}`,
      {
        [`${prefix}--search--active`]: isActive && forceState === null,
        [`${prefix}--search--disabled`]: isDisabled && forceState !== 'disabled',
        [`${prefix}--search--force-hover`]: forceState === 'hover',
        [`${prefix}--search--force-onclick`]: forceState === 'onclick',
        [`${prefix}--search--force-active`]: forceState === 'active',
        [`${prefix}--search--force-disabled`]: forceState === 'disabled',
      },
      className
    );

    return (
      <div
        className={rootClass}
        onClick={() => !isDisabled && inputRef.current?.focus()}
        role="search">
        <span className={`${prefix}--search__icon`} aria-hidden="true">
          <SearchIconElement size={16} />
        </span>
        <input
          ref={setRef}
          type="text"
          className={`${prefix}--search__input`}
          value={current ?? ''}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={isDisabled}
          aria-label={placeholder}
          {...rest}
        />
        <span className={`${prefix}--search__clear`}>
          <IconButton
            kind="ghost"
            size="sm"
            iconSize={16}
            renderIcon={X}
            aria-label="Clear search"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            tabIndex={-1}
          />
        </span>
      </div>
    );
  }
);

Search.displayName = 'Search';

Search.propTypes = {
  size: PropTypes.oneOf(SearchSizes),
  background: PropTypes.oneOf(SearchBackgrounds),
  shape: PropTypes.oneOf(SearchShapes),
  forceState: PropTypes.oneOf([...SearchForceStates, null]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  renderSearchIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default Search;
