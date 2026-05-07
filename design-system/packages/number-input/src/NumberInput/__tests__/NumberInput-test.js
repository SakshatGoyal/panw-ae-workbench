import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NumberInput } from '../NumberInput';

describe('NumberInput', () => {
  it('renders with title and value', () => {
    render(<NumberInput title="Qty" value={3} />);
    expect(screen.getByLabelText('Qty')).toHaveValue(3);
  });

  it('fires onChange on increment', () => {
    const fn = vi.fn();
    render(<NumberInput title="x" value={1} onChange={fn} />);
    fireEvent.click(screen.getByRole('button', { name: /Increase value/i }));
    expect(fn).toHaveBeenCalledWith(2);
  });

  it('fires onChange on decrement', () => {
    const fn = vi.fn();
    render(<NumberInput title="x" value={5} onChange={fn} />);
    fireEvent.click(screen.getByRole('button', { name: /Decrease value/i }));
    expect(fn).toHaveBeenCalledWith(4);
  });

  it('respects min/max on increment/decrement', () => {
    const fn = vi.fn();
    render(<NumberInput title="x" value={10} max={10} onChange={fn} />);
    fireEvent.click(screen.getByRole('button', { name: /Increase value/i }));
    expect(fn).toHaveBeenCalledWith(10);
  });

  it('disabled prevents stepper actions', () => {
    const fn = vi.fn();
    render(<NumberInput title="x" value={1} onChange={fn} disabled />);
    fireEvent.click(screen.getByRole('button', { name: /Increase value/i }));
    expect(fn).not.toHaveBeenCalled();
  });

  it('input handler fires onChange', () => {
    const fn = vi.fn();
    render(<NumberInput title="x" value={1} onChange={fn} />);
    fireEvent.change(screen.getByLabelText('x'), { target: { value: '7' } });
    expect(fn).toHaveBeenCalledWith(7);
  });

  it('clamps input to min/max', () => {
    const fn = vi.fn();
    render(<NumberInput title="x" value={1} min={0} max={5} onChange={fn} />);
    fireEvent.change(screen.getByLabelText('x'), { target: { value: '99' } });
    expect(fn).toHaveBeenLastCalledWith(5);
  });

  it('forwards ref to the input', () => {
    const ref = React.createRef();
    render(<NumberInput ref={ref} title="x" value={1} />);
    expect(ref.current.tagName).toBe('INPUT');
  });

  it('renders both stepper IconButtons', () => {
    render(<NumberInput title="x" value={1} />);
    expect(screen.getByRole('button', { name: /Decrease value/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Increase value/i })).toBeInTheDocument();
  });

  it('hides title when showTitle=false', () => {
    render(<NumberInput title="Hidden" showTitle={false} value={1} />);
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });
});
