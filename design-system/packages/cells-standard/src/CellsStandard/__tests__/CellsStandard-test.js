import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CellsStandard } from '../CellsStandard';

describe('CellsStandard', () => {
  it('renders without crashing', () => {
    render(<CellsStandard text="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('composes CellContents', () => {
    const { container } = render(<CellsStandard text="x" />);
    expect(container.querySelector('.panw--cell-contents')).toBeInTheDocument();
  });

  it('renders the checkbox when checkbox=true', () => {
    const { container } = render(<CellsStandard checkbox />);
    expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument();
  });

  it('does not render the checkbox when checkbox=false', () => {
    const { container } = render(<CellsStandard />);
    expect(container.querySelector('input[type="checkbox"]')).not.toBeInTheDocument();
  });

  it('fires onCheckboxChange when checkbox is toggled', () => {
    const handle = vi.fn();
    const { container } = render(<CellsStandard checkbox onCheckboxChange={handle} />);
    fireEvent.click(container.querySelector('input[type="checkbox"]'));
    expect(handle).toHaveBeenCalled();
  });

  it('fires onExpandClick when the expand toggle is clicked', () => {
    const handle = vi.fn();
    const { container } = render(<CellsStandard expandable onExpandClick={handle} />);
    fireEvent.click(container.querySelector('button[aria-label="Expand row"]'));
    expect(handle).toHaveBeenCalled();
  });

  it('applies the active class when forceState=active', () => {
    const { container } = render(<CellsStandard forceState="active" />);
    expect(container.querySelector('.panw--cells-std--active')).toBeInTheDocument();
  });

  it('applies the locked class and aria-disabled when forceState=locked', () => {
    const { container } = render(<CellsStandard forceState="locked" />);
    expect(container.querySelector('.panw--cells-std--locked')).toBeInTheDocument();
    expect(container.querySelector('[aria-disabled="true"]')).toBeInTheDocument();
  });

  it('does not invoke onClick when locked', () => {
    const handle = vi.fn();
    const { container } = render(
      <CellsStandard forceState="locked" onClick={handle} text="row" />
    );
    fireEvent.click(container.firstChild);
    expect(handle).not.toHaveBeenCalled();
  });

  it('renders trend indicator for numberUp', () => {
    const { container } = render(<CellsStandard content="numberUp" />);
    expect(container.querySelector('.panw--cell-contents__trend--up')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef();
    render(<CellsStandard ref={ref} />);
    expect(ref.current.tagName).toBe('DIV');
  });
});
