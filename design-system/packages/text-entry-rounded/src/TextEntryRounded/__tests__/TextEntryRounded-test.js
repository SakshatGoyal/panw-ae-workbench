import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextEntryRounded } from '../TextEntryRounded';

describe('TextEntryRounded', () => {
  it('renders with title and placeholder', () => {
    render(<TextEntryRounded title="T" placeholder="P" />);
    expect(screen.getByLabelText('T')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('P')).toBeInTheDocument();
  });

  it('uncontrolled: typing updates the input', () => {
    render(<TextEntryRounded title="x" />);
    const i = screen.getByRole('textbox');
    fireEvent.change(i, { target: { value: 'abc' } });
    expect(i).toHaveValue('abc');
  });

  it('controlled: shows controlled value', () => {
    render(<TextEntryRounded title="x" value="hello" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('hello');
  });

  it('fires onChange with the value', () => {
    const fn = vi.fn();
    render(<TextEntryRounded title="x" onChange={fn} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });
    expect(fn).toHaveBeenCalledWith('a', expect.anything());
  });

  it('renders textarea when inputType=area', () => {
    render(<TextEntryRounded title="x" inputType="area" />);
    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
  });

  it('disabled disables the input', () => {
    render(<TextEntryRounded title="x" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('readOnly applies readonly attribute', () => {
    render(<TextEntryRounded title="x" readOnly value="ro" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });

  it('clear button renders when active and has content', () => {
    render(<TextEntryRounded title="x" value="abc" onChange={() => {}} forceState="active" />);
    expect(screen.getByRole('button', { name: /Clear text/i })).toBeInTheDocument();
  });

  it('clear button fires onClear', () => {
    const fn = vi.fn();
    render(<TextEntryRounded title="x" value="abc" onChange={() => {}} onClear={fn} forceState="active" />);
    fireEvent.click(screen.getByRole('button', { name: /Clear text/i }));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('forwards ref to the input', () => {
    const ref = React.createRef();
    render(<TextEntryRounded ref={ref} title="x" />);
    expect(['INPUT', 'TEXTAREA']).toContain(ref.current.tagName);
  });
});
