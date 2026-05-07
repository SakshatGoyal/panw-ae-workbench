import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox, CheckboxStatuses } from '../Checkbox';

describe('Checkbox', () => {
  it('renders without crashing', () => {
    render(<Checkbox label="x" />);
    expect(screen.getByText('x')).toBeInTheDocument();
  });

  it('renders a real checkbox input', () => {
    render(<Checkbox label="x" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('reflects checked status', () => {
    render(<Checkbox label="x" status="checked" />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('sets aria-checked=mixed for indeterminate', () => {
    render(<Checkbox label="x" status="indeterminate" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('sets DOM indeterminate property when status=indeterminate', () => {
    render(<Checkbox label="x" status="indeterminate" />);
    const input = screen.getByRole('checkbox');
    expect(input.indeterminate).toBe(true);
  });

  it('clears DOM indeterminate when status changes', () => {
    const { rerender } = render(<Checkbox label="x" status="indeterminate" />);
    rerender(<Checkbox label="x" status="checked" />);
    const input = screen.getByRole('checkbox');
    expect(input.indeterminate).toBe(false);
  });

  it('applies icon class for each status', () => {
    CheckboxStatuses.forEach((s) => {
      const { container, unmount } = render(<Checkbox label="x" status={s} />);
      expect(container.querySelector(`.panw--checkbox-icon--${s}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('applies disabled class', () => {
    const { container } = render(<Checkbox label="x" disabled />);
    expect(container.querySelector('.panw--checkbox-root--disabled')).toBeInTheDocument();
  });

  it('toggles to checked from unchecked', () => {
    const handler = vi.fn();
    render(<Checkbox label="x" status="unchecked" onChange={handler} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handler.mock.calls[0][0]).toBe('checked');
  });

  it('toggles to unchecked from checked', () => {
    const handler = vi.fn();
    render(<Checkbox label="x" status="checked" onChange={handler} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handler.mock.calls[0][0]).toBe('unchecked');
  });

  it('does not fire when disabled', () => {
    const handler = vi.fn();
    render(<Checkbox label="x" disabled onChange={handler} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('forwards ref to input', () => {
    const ref = React.createRef();
    render(<Checkbox ref={ref} label="x" />);
    expect(ref.current.tagName).toBe('INPUT');
  });
});
