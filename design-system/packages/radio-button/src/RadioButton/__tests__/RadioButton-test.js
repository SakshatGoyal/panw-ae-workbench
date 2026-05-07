import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RadioButton } from '../RadioButton';

describe('RadioButton', () => {
  it('renders without crashing', () => {
    render(<RadioButton label="x" />);
    expect(screen.getByText('x')).toBeInTheDocument();
  });

  it('renders a real input[type=radio]', () => {
    render(<RadioButton label="x" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('reflects checked state on the input', () => {
    render(<RadioButton label="x" checked />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('applies disabled class when disabled', () => {
    const { container } = render(<RadioButton label="x" disabled />);
    expect(container.querySelector('.panw--radio-button--disabled')).toBeInTheDocument();
  });

  it('renders the dot path when checked', () => {
    const { container } = render(<RadioButton label="x" checked />);
    expect(container.querySelector('.panw--rb-dot')).toBeInTheDocument();
  });

  it('renders the dot path when disabled (per PANW spec)', () => {
    const { container } = render(<RadioButton label="x" disabled />);
    expect(container.querySelector('.panw--rb-dot')).toBeInTheDocument();
  });

  it('does not render dot when unchecked and not disabled', () => {
    const { container } = render(<RadioButton label="x" />);
    expect(container.querySelector('.panw--rb-dot')).not.toBeInTheDocument();
  });

  it('fires onChange with toggled value', () => {
    const handler = vi.fn();
    render(<RadioButton label="x" onChange={handler} />);
    fireEvent.click(screen.getByRole('radio'));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0]).toBe(true);
  });

  it('does not fire onChange when disabled', () => {
    const handler = vi.fn();
    render(<RadioButton label="x" disabled onChange={handler} />);
    fireEvent.click(screen.getByRole('radio'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('forwards ref to the input', () => {
    const ref = React.createRef();
    render(<RadioButton ref={ref} label="x" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current.tagName).toBe('INPUT');
  });
});
