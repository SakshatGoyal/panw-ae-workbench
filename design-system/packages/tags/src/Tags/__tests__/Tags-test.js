/**
 * Smoke tests for Tags.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Star } from '@ds/icons';
import { Tags, TagColors, TagContrasts, TagSizes } from '../Tags';

describe('Tags', () => {
  it('renders without crashing', () => {
    render(<Tags label="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('uses the default placeholder label when none is given', () => {
    render(<Tags />);
    expect(screen.getByText('Placeholder')).toBeInTheDocument();
  });

  it('applies the base tag class', () => {
    const { container } = render(<Tags label="x" />);
    expect(container.querySelector('.panw--tag')).toBeInTheDocument();
  });

  it('applies the correct class for each color', () => {
    TagColors.forEach((color) => {
      const { container, unmount } = render(<Tags label="x" color={color} />);
      expect(container.querySelector(`.panw--tag--${color}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('applies the correct class for each contrast', () => {
    TagContrasts.forEach((contrast) => {
      const { container, unmount } = render(<Tags label="x" contrast={contrast} />);
      expect(container.querySelector(`.panw--tag--${contrast}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('applies the correct class for each size', () => {
    TagSizes.forEach((size) => {
      const { container, unmount } = render(<Tags label="x" size={size} />);
      expect(container.querySelector(`.panw--tag--size-${size}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('renders the leading icon when icon=true', () => {
    const { container } = render(<Tags label="x" icon />);
    expect(container.querySelector('.panw--tag__icon')).toBeInTheDocument();
  });

  it('does NOT render the leading icon when icon=false', () => {
    const { container } = render(<Tags label="x" />);
    expect(container.querySelector('.panw--tag__icon')).not.toBeInTheDocument();
  });

  it('renders a custom renderIcon component', () => {
    const { container } = render(<Tags label="x" icon renderIcon={Star} />);
    expect(container.querySelector('.panw--tag__icon svg')).toBeInTheDocument();
  });

  it('renders the close button when close=true', () => {
    render(<Tags label="x" close />);
    expect(screen.getByRole('button', { name: /Remove x/i })).toBeInTheDocument();
  });

  it('does NOT render the close button when close=false', () => {
    render(<Tags label="x" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('fires onClose when the close button is clicked', () => {
    const handler = vi.fn();
    render(<Tags label="x" close onClose={handler} />);
    fireEvent.click(screen.getByRole('button', { name: /Remove x/i }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('forwards a ref to the root <span>', () => {
    const ref = React.createRef();
    render(<Tags ref={ref} label="x" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current.tagName).toBe('SPAN');
  });

  it('passes through className', () => {
    const { container } = render(<Tags label="x" className="extra" />);
    expect(container.querySelector('.panw--tag.extra')).toBeInTheDocument();
  });
});
