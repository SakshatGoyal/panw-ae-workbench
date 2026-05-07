import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MultiSelect } from '../MultiSelect';

const opts = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
  { label: 'C', value: 'c' },
];

describe('MultiSelect', () => {
  it('renders placeholder when no values', () => {
    render(<MultiSelect placeholder="Pick" options={opts} />);
    expect(screen.getByText('Pick')).toBeInTheDocument();
  });

  it('renders chips for selected values via @ds/tags', () => {
    const { container } = render(<MultiSelect options={opts} selectedValues={['a', 'b']} />);
    expect(container.querySelectorAll('.panw--tag').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('collapses overflow into +N chip', () => {
    render(<MultiSelect options={opts} selectedValues={['a', 'b', 'c']} visibleChipCount={2} />);
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('opens menu on click', () => {
    render(<MultiSelect options={opts} />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('toggles selection and fires onChange', () => {
    const fn = vi.fn();
    render(<MultiSelect options={opts} onChange={fn} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: 'A' }));
    expect(fn).toHaveBeenLastCalledWith(['a']);
    fireEvent.click(screen.getByRole('option', { name: 'B' }));
    expect(fn).toHaveBeenLastCalledWith(['a', 'b']);
    fireEvent.click(screen.getByRole('option', { name: 'A' }));
    expect(fn).toHaveBeenLastCalledWith(['b']);
  });

  it('keeps menu open across multiple selections', () => {
    render(<MultiSelect options={opts} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: 'A' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('disabled prevents toggle', () => {
    render(<MultiSelect options={opts} disabled />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('exposes aria-multiselectable', () => {
    render(<MultiSelect options={opts} />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-multiselectable', 'true');
  });

  it('forwards ref', () => {
    const ref = React.createRef();
    render(<MultiSelect ref={ref} options={opts} />);
    expect(ref.current.tagName).toBe('DIV');
  });
});
