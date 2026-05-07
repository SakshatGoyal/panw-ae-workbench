import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  it('renders nav buttons', () => {
    render(<Pagination totalItems={30} rowsPerPage={10} currentPage={1} />);
    expect(screen.getByRole('button', { name: /First page/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Previous page/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next page/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Last page/i })).toBeInTheDocument();
  });

  it('disables First/Previous on page 1', () => {
    render(<Pagination totalItems={50} rowsPerPage={10} currentPage={1} />);
    expect(screen.getByRole('button', { name: /First page/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Previous page/i })).toBeDisabled();
  });

  it('disables Next/Last on the last page', () => {
    render(<Pagination totalItems={30} rowsPerPage={10} currentPage={3} />);
    expect(screen.getByRole('button', { name: /Next page/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Last page/i })).toBeDisabled();
  });

  it('clicking Next fires onPageChange', () => {
    const fn = vi.fn();
    render(<Pagination totalItems={50} rowsPerPage={10} currentPage={2} onPageChange={fn} />);
    fireEvent.click(screen.getByRole('button', { name: /Next page/i }));
    expect(fn).toHaveBeenCalledWith(3);
  });

  it('clicking Previous fires onPageChange', () => {
    const fn = vi.fn();
    render(<Pagination totalItems={50} rowsPerPage={10} currentPage={3} onPageChange={fn} />);
    fireEvent.click(screen.getByRole('button', { name: /Previous page/i }));
    expect(fn).toHaveBeenCalledWith(2);
  });

  it('clicking Last fires onPageChange with totalPages', () => {
    const fn = vi.fn();
    render(<Pagination totalItems={50} rowsPerPage={10} currentPage={1} onPageChange={fn} />);
    fireEvent.click(screen.getByRole('button', { name: /Last page/i }));
    expect(fn).toHaveBeenCalledWith(5);
  });

  it('marks the active page with aria-current=page', () => {
    render(<Pagination totalItems={50} rowsPerPage={10} currentPage={3} />);
    const active = screen.getByRole('button', { name: 'Page 3', current: 'page' });
    expect(active).toHaveAttribute('aria-current', 'page');
  });

  it('clicking a page number fires onPageChange', () => {
    const fn = vi.fn();
    render(<Pagination totalItems={50} rowsPerPage={10} currentPage={1} onPageChange={fn} />);
    fireEvent.click(screen.getByRole('button', { name: 'Page 4' }));
    expect(fn).toHaveBeenCalledWith(4);
  });

  it('renders ellipsis when many pages', () => {
    const { container } = render(<Pagination totalItems={500} rowsPerPage={10} currentPage={20} maxVisiblePages={5} />);
    const ellipsis = container.querySelectorAll('.panw--pagination__ellipsis');
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  it('renders the items-per-page Dropdown by default', () => {
    render(<Pagination totalItems={50} rowsPerPage={10} currentPage={1} />);
    expect(screen.getByText('Items per page')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('hides items-per-page when showItemsPerPage=false', () => {
    render(<Pagination totalItems={50} rowsPerPage={10} currentPage={1} showItemsPerPage={false} />);
    expect(screen.queryByText('Items per page')).not.toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef();
    render(<Pagination ref={ref} totalItems={10} rowsPerPage={10} />);
    expect(ref.current.tagName).toBe('DIV');
  });
});
