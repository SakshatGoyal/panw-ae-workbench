import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '../Search';

describe('Search', () => {
  it('renders an input with a placeholder', () => {
    render(<Search placeholder="Find" />);
    expect(screen.getByPlaceholderText('Find')).toBeInTheDocument();
  });

  it('uncontrolled: typing updates the input', () => {
    render(<Search />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(input).toHaveValue('abc');
  });

  it('controlled: shows the controlled value', () => {
    render(<Search value="x" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('x');
  });

  it('fires onChange', () => {
    const fn = vi.fn();
    render(<Search onChange={fn} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });
    expect(fn).toHaveBeenCalled();
  });

  it('clear button fires onClear', () => {
    const fn = vi.fn();
    render(<Search value="x" onChange={() => {}} onClear={fn} />);
    fireEvent.click(screen.getByRole('button', { name: /Clear search/i }));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('disabled prevents change handler from being meaningful', () => {
    render(<Search disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies size and background classes', () => {
    const { container } = render(<Search size="lg" background="grey0" />);
    expect(container.querySelector('.panw--search--lg')).toBeInTheDocument();
    expect(container.querySelector('.panw--search--grey0')).toBeInTheDocument();
  });

  it('applies validation class when set', () => {
    const { container } = render(<Search validation="error" />);
    expect(container.querySelector('.panw--search--error')).toBeInTheDocument();
  });

  it('forwards ref to the input', () => {
    const ref = React.createRef();
    render(<Search ref={ref} />);
    expect(ref.current.tagName).toBe('INPUT');
  });

  it('has role search on the wrapper', () => {
    render(<Search />);
    expect(screen.getByRole('search')).toBeInTheDocument();
  });
});
