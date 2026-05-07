import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Chip, ChipSizes, ChipThemes } from '../Chip';

describe('Chip', () => {
  it('renders without crashing', () => {
    render(<Chip label="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies the base chip class', () => {
    const { container } = render(<Chip label="x" />);
    expect(container.querySelector('.panw--chip')).toBeInTheDocument();
  });

  it('applies size class for each size', () => {
    ChipSizes.forEach((size) => {
      const { container, unmount } = render(<Chip label="x" size={size} />);
      if (size === 'small') {
        expect(container.querySelector('.panw--chip--small')).toBeInTheDocument();
      }
      unmount();
    });
  });

  it('applies theme class for each theme', () => {
    ChipThemes.forEach((theme) => {
      const { container, unmount } = render(<Chip label="x" theme={theme} />);
      if (theme === 'dark') {
        expect(container.querySelector('.panw--chip--dark')).toBeInTheDocument();
      }
      unmount();
    });
  });

  it('renders close button by default', () => {
    render(<Chip label="x" />);
    expect(screen.getByRole('button', { name: /Remove x/i })).toBeInTheDocument();
  });

  it('hides close button when closeable=false', () => {
    render(<Chip label="x" closeable={false} />);
    expect(screen.queryByRole('button', { name: /Remove x/i })).not.toBeInTheDocument();
  });

  it('renders leading icon when icon=true', () => {
    const { container } = render(<Chip label="x" icon />);
    expect(container.querySelector('.panw--chip__icon')).toBeInTheDocument();
  });

  it('renders image when image=true', () => {
    const { container } = render(<Chip label="x" image imageAlt="alt" />);
    expect(container.querySelector('.panw--chip__image')).toBeInTheDocument();
  });

  it('renders dropdown chevron when dropdown=true', () => {
    const { container } = render(<Chip label="x" dropdown closeable={false} />);
    expect(container.querySelector('.panw--chip__dropdown-icon')).toBeInTheDocument();
  });

  it('applies active class and aria-pressed when active', () => {
    const { container } = render(<Chip label="x" active />);
    expect(container.querySelector('.panw--chip--active')).toBeInTheDocument();
    expect(container.querySelector('[aria-pressed="true"]')).toBeInTheDocument();
  });

  it('applies disabled class and aria-disabled', () => {
    const { container } = render(<Chip label="x" disabled />);
    expect(container.querySelector('.panw--chip--disabled')).toBeInTheDocument();
    expect(container.querySelector('[aria-disabled="true"]')).toBeInTheDocument();
  });

  it('fires onClick on body click when not disabled', () => {
    const handler = vi.fn();
    render(<Chip label="x" onClick={handler} />);
    fireEvent.click(screen.getByText('x'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', () => {
    const handler = vi.fn();
    render(<Chip label="x" disabled onClick={handler} />);
    fireEvent.click(screen.getByText('x'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('fires onClose on close click without firing onClick', () => {
    const onClick = vi.fn();
    const onClose = vi.fn();
    render(<Chip label="x" onClick={onClick} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /Remove x/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('forwards ref to the root div', () => {
    const ref = React.createRef();
    render(<Chip ref={ref} label="x" />);
    expect(ref.current.tagName).toBe('DIV');
  });
});
