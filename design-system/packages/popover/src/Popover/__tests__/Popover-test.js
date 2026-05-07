import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Popover } from '../Popover';

describe('Popover', () => {
  it('renders heading + description + stepper by default', () => {
    render(<Popover heading="H" description="D" totalPages={3} />);
    expect(screen.getByText('H')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.getByText('1 of 3')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('Next advances the page and fires onPageChange', () => {
    const fn = vi.fn();
    render(<Popover totalPages={3} onPageChange={fn} />);
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    expect(fn).toHaveBeenCalledWith(2);
    expect(screen.getByText('2 of 3')).toBeInTheDocument();
  });

  it('Previous is disabled at page 1', () => {
    render(<Popover totalPages={3} />);
    expect(screen.getByRole('button', { name: /Previous/i })).toBeDisabled();
  });

  it('Next is disabled at last page', () => {
    render(<Popover totalPages={2} currentPage={2} />);
    expect(screen.getByRole('button', { name: /Next/i })).toBeDisabled();
  });

  it('applies direction and density classes', () => {
    const { container } = render(<Popover pointerDirection="bottom" density="short" />);
    expect(container.querySelector('.panw--popover--direction-bottom')).toBeInTheDocument();
    expect(container.querySelector('.panw--popover--density-short')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef();
    render(<Popover ref={ref} />);
    expect(ref.current.tagName).toBe('DIV');
  });

  it('hides heading/description/image/stepper individually via flags', () => {
    render(
      <Popover
        showHeading={false}
        showDescription={false}
        showImage={false}
        showStepper={false}
      />
    );
    expect(screen.queryByText('Small Heading')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Next/i })).not.toBeInTheDocument();
  });

  it('density=short omits image even when showImage is true (image is structured-only)', () => {
    const { container } = render(<Popover density="short" showImage />);
    expect(container.querySelector('.panw--popover__image')).toBeNull();
  });

  it('renders custom children body in place of description', () => {
    render(
      <Popover>
        <span>custom body</span>
      </Popover>
    );
    expect(screen.getByText('custom body')).toBeInTheDocument();
    expect(screen.queryByText(/Sample content for a popover/)).not.toBeInTheDocument();
  });
});
