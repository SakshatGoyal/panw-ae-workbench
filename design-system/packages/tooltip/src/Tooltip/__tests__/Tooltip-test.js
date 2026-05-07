import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tooltip, DescriptiveTooltip } from '../Tooltip';

describe('Tooltip', () => {
  it('renders default variant text content', () => {
    render(<Tooltip content="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('renders descriptive heading + description + stepper', () => {
    render(<Tooltip kind="descriptive" heading="H" description="D" totalPages={3} />);
    expect(screen.getByText('H')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.getByText('1 of 3')).toBeInTheDocument();
  });

  it('descriptive stepper Next advances the page and fires onPageChange', () => {
    const fn = vi.fn();
    render(<Tooltip kind="descriptive" totalPages={3} onPageChange={fn} />);
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    expect(fn).toHaveBeenCalledWith(2);
    expect(screen.getByText('2 of 3')).toBeInTheDocument();
  });

  it('Previous is disabled at page 1', () => {
    render(<Tooltip kind="descriptive" totalPages={3} />);
    expect(screen.getByRole('button', { name: /Previous/i })).toBeDisabled();
  });

  it('Next is disabled at last page', () => {
    render(<Tooltip kind="descriptive" totalPages={2} currentPage={2} />);
    expect(screen.getByRole('button', { name: /Next/i })).toBeDisabled();
  });

  it('applies direction and position classes', () => {
    const { container } = render(<Tooltip pointerDirection="bottom" pointerPosition="right" />);
    expect(container.querySelector('.panw--tooltip--direction-bottom')).toBeInTheDocument();
    // position 'right' for bottom direction normalizes to 'right'
    expect(container.querySelector('.panw--tooltip--position-right')).toBeInTheDocument();
  });

  it('DescriptiveTooltip wrapper sets kind=descriptive', () => {
    const { container } = render(<DescriptiveTooltip />);
    expect(container.querySelector('.panw--tooltip--type-descriptive')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef();
    render(<Tooltip ref={ref} />);
    expect(ref.current.tagName).toBe('DIV');
  });

  it('hides heading/description/image/stepper individually via flags', () => {
    render(
      <Tooltip
        kind="descriptive"
        showHeading={false}
        showDescription={false}
        showImage={false}
        showStepper={false}
      />
    );
    expect(screen.queryByText('Small Heading')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Next/i })).not.toBeInTheDocument();
  });
});
