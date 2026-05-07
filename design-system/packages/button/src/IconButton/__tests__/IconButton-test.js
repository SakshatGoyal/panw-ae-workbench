/**
 * Smoke tests for IconButton.
 * Follows Carbon's test conventions: single describe block, named tests,
 * @testing-library/react with getByRole / toHaveClass / toHaveAttribute.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IconButton, IconButtonKinds, IconButtonSizes } from '../IconButton';
import { Plus, Search } from 'lucide-react';

const DefaultIcon = (props) => <Plus size={16} data-testid="icon" {...props} />;

describe('IconButton', () => {
  it('renders without crashing', () => {
    render(<IconButton renderIcon={DefaultIcon} aria-label="Add" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders as a <button> element', () => {
    render(<IconButton renderIcon={DefaultIcon} aria-label="Add" />);
    expect(screen.getByRole('button').tagName).toBe('BUTTON');
  });

  it('sets aria-label on the button', () => {
    render(<IconButton renderIcon={DefaultIcon} aria-label="Add item" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Add item');
  });

  it('applies the base class', () => {
    render(<IconButton renderIcon={DefaultIcon} aria-label="Add" />);
    expect(screen.getByRole('button')).toHaveClass('panw--btn-icon');
  });

  it('applies the default kind class (ghost)', () => {
    render(<IconButton renderIcon={DefaultIcon} aria-label="Add" />);
    expect(screen.getByRole('button')).toHaveClass('panw--btn-icon--ghost');
  });

  it('applies the correct class for each kind', () => {
    IconButtonKinds.forEach((kind) => {
      const { unmount } = render(
        <IconButton kind={kind} renderIcon={DefaultIcon} aria-label="Add" />
      );
      expect(screen.getByRole('button')).toHaveClass(`panw--btn-icon--${kind}`);
      unmount();
    });
  });

  it('applies the correct class for each size', () => {
    IconButtonSizes.forEach((size) => {
      const { unmount } = render(
        <IconButton size={size} renderIcon={DefaultIcon} aria-label="Add" />
      );
      expect(screen.getByRole('button')).toHaveClass(`panw--btn-icon--${size}`);
      unmount();
    });
  });

  it('sets disabled attribute when disabled prop is true', () => {
    render(<IconButton disabled renderIcon={DefaultIcon} aria-label="Add" />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <IconButton disabled renderIcon={DefaultIcon} aria-label="Add" onClick={handleClick} />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('fires onClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <IconButton renderIcon={DefaultIcon} aria-label="Add" onClick={handleClick} />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref to the <button> element', () => {
    const ref = React.createRef();
    render(<IconButton ref={ref} renderIcon={DefaultIcon} aria-label="Add" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current.tagName).toBe('BUTTON');
  });

  it('renders the icon inside the icon wrapper', () => {
    const { container } = render(
      <IconButton renderIcon={DefaultIcon} aria-label="Add" />
    );
    expect(container.querySelector('.panw--btn-icon__icon')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('wraps the icon with aria-hidden', () => {
    const { container } = render(
      <IconButton renderIcon={DefaultIcon} aria-label="Add" />
    );
    const iconWrapper = container.querySelector('.panw--btn-icon__icon');
    expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies selected class and aria-pressed when isSelected and kind=ghost', () => {
    render(
      <IconButton
        kind="ghost"
        isSelected
        renderIcon={DefaultIcon}
        aria-label="Toggle"
      />
    );
    expect(screen.getByRole('button')).toHaveClass('panw--btn-icon--selected');
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('does not apply selected class when kind is not ghost', () => {
    render(
      <IconButton
        kind="primary"
        isSelected
        renderIcon={DefaultIcon}
        aria-label="Toggle"
      />
    );
    expect(screen.getByRole('button')).not.toHaveClass('panw--btn-icon--selected');
  });

  it('applies iconSize class to the icon wrapper', () => {
    const { container } = render(
      <IconButton iconSize={20} renderIcon={DefaultIcon} aria-label="Add" />
    );
    expect(container.querySelector('.panw--btn-icon__icon--20')).toBeInTheDocument();
  });

  it('merges custom className with generated classes', () => {
    render(
      <IconButton className="custom-class" renderIcon={DefaultIcon} aria-label="Add" />
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('custom-class');
    expect(btn).toHaveClass('panw--btn-icon');
  });

  it('renders a different icon when renderIcon changes', () => {
    const SearchIcon = (props) => <Search size={16} data-testid="search-icon" {...props} />;
    const { rerender } = render(
      <IconButton renderIcon={DefaultIcon} aria-label="Add" />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();

    rerender(<IconButton renderIcon={SearchIcon} aria-label="Search" />);
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });
});
