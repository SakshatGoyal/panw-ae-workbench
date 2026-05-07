import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header, HeaderTypes } from '../Header';

describe('Header', () => {
  it('renders children', () => {
    render(<Header>Title</Header>);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('has role columnheader', () => {
    render(<Header>X</Header>);
    expect(screen.getByRole('columnheader')).toBeInTheDocument();
  });

  it('fires onHeaderClick', () => {
    const fn = vi.fn();
    render(<Header onHeaderClick={fn}>X</Header>);
    fireEvent.click(screen.getByRole('columnheader'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('renders filter IconButton when filter=true', () => {
    render(<Header filter>X</Header>);
    expect(screen.getByRole('button', { name: /Filter column/i })).toBeInTheDocument();
  });

  it('does not render filter when filter=false', () => {
    render(<Header>X</Header>);
    expect(screen.queryByRole('button', { name: /Filter column/i })).not.toBeInTheDocument();
  });

  it('filter click fires onFilterClick and not onHeaderClick', () => {
    const onF = vi.fn();
    const onH = vi.fn();
    render(<Header filter onHeaderClick={onH} onFilterClick={onF}>X</Header>);
    fireEvent.click(screen.getByRole('button', { name: /Filter column/i }));
    expect(onF).toHaveBeenCalledTimes(1);
    expect(onH).not.toHaveBeenCalled();
  });

  it('applies type class for each type', () => {
    HeaderTypes.forEach((t) => {
      const { container, unmount } = render(<Header type={t}>X</Header>);
      if (t !== 'basic') {
        expect(container.querySelector(`.panw--header__type-icon--${t}`)).toBeInTheDocument();
      }
      unmount();
    });
  });

  it('shows sort indicator only for basic type', () => {
    const { container, rerender } = render(<Header type="basic">X</Header>);
    expect(container.querySelector('.panw--header__sort-indicator')).toBeInTheDocument();
    rerender(<Header type="ascending">X</Header>);
    expect(container.querySelector('.panw--header__sort-indicator')).not.toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef();
    render(<Header ref={ref}>X</Header>);
    expect(ref.current.tagName).toBe('DIV');
  });

  it('passes through className', () => {
    const { container } = render(<Header className="extra">X</Header>);
    expect(container.querySelector('.panw--header.extra')).toBeInTheDocument();
  });
});
