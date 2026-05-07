import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from '../Dropdown';

const opts = [
  { label: 'One', value: 'one' },
  { label: 'Two', value: 'two' },
];

describe('Dropdown', () => {
  it('renders the placeholder when no value', () => {
    render(<Dropdown placeholder="Pick one" options={opts} />);
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('shows the title and description', () => {
    render(<Dropdown title="T" description="D" options={opts} />);
    expect(screen.getByText('T')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  it('hides title when showTitle=false', () => {
    render(<Dropdown title="T" showTitle={false} options={opts} />);
    expect(screen.queryByText('T')).not.toBeInTheDocument();
  });

  it('opens the menu on click', () => {
    render(<Dropdown options={opts} />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('One')).toBeInTheDocument();
  });

  it('opens on Enter key', () => {
    render(<Dropdown options={opts} />);
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('selects an option and fires onChange', () => {
    const fn = vi.fn();
    render(<Dropdown options={opts} onChange={fn} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('Two'));
    expect(fn).toHaveBeenCalledWith('two');
  });

  it('closes menu after selection', () => {
    render(<Dropdown options={opts} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('One'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('renders the selected label', () => {
    render(<Dropdown options={opts} selectedValue="two" />);
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('disabled prevents toggle', () => {
    render(<Dropdown options={opts} disabled />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('readOnly prevents toggle', () => {
    render(<Dropdown options={opts} readOnly selectedValue="one" />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef();
    render(<Dropdown ref={ref} options={opts} />);
    expect(ref.current.tagName).toBe('DIV');
  });
});
