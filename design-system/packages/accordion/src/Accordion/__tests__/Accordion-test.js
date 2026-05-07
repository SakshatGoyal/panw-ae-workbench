import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion, AccordionSizes } from '../Accordion';

describe('Accordion', () => {
  it('renders without crashing', () => {
    render(<Accordion title="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies the base class', () => {
    const { container } = render(<Accordion title="x" />);
    expect(container.querySelector('.panw--accordion')).toBeInTheDocument();
  });

  it('applies the size class for each size', () => {
    AccordionSizes.forEach((size) => {
      const { container, unmount } = render(<Accordion title="x" size={size} />);
      expect(container.querySelector(`.panw--accordion--size-${size}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('reflects open vs closed via aria-expanded', () => {
    const { rerender } = render(<Accordion title="x" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    rerender(<Accordion title="x" open />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('fires onToggle on click', () => {
    const fn = vi.fn();
    render(<Accordion title="x" onToggle={fn} />);
    fireEvent.click(screen.getByRole('button'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('fires onToggle on Enter and Space', () => {
    const fn = vi.fn();
    render(<Accordion title="x" onToggle={fn} />);
    const btn = screen.getByRole('button');
    fireEvent.keyDown(btn, { key: 'Enter' });
    fireEvent.keyDown(btn, { key: ' ' });
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('disabled prevents toggle and sets tabIndex=-1', () => {
    const fn = vi.fn();
    render(<Accordion title="x" disabled onToggle={fn} />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-disabled', 'true');
    expect(btn).toHaveAttribute('tabIndex', '-1');
    fireEvent.click(btn);
    expect(fn).not.toHaveBeenCalled();
  });

  it('renders tag when showTag', () => {
    const { container } = render(<Accordion title="x" showTag tagLabel="Beta" />);
    expect(container.querySelector('.panw--tag')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('does not render tag when showTag=false', () => {
    const { container } = render(<Accordion title="x" />);
    expect(container.querySelector('.panw--tag')).not.toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<Accordion title="x" description="info" />);
    expect(screen.getByText('info')).toBeInTheDocument();
  });

  it('forwards a ref to the root', () => {
    const ref = React.createRef();
    render(<Accordion ref={ref} title="x" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current.tagName).toBe('DIV');
  });

  it('passes through className', () => {
    const { container } = render(<Accordion title="x" className="extra" />);
    expect(container.querySelector('.panw--accordion.extra')).toBeInTheDocument();
  });
});
