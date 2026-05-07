import React from 'react';
import { render, screen } from '@testing-library/react';
import { CellContents, CellContentTypes, CellStates } from '../CellContents';

describe('CellContents', () => {
  it('renders default text', () => {
    render(<CellContents />);
    expect(screen.getByText('Cell Content')).toBeInTheDocument();
  });

  it('renders provided text', () => {
    render(<CellContents text="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies the right-align class for numeric content', () => {
    const { container } = render(<CellContents content="numbers" />);
    expect(container.querySelector('.panw--cell-contents__text--right')).toBeInTheDocument();
  });

  it('renders trend up arrow', () => {
    const { container } = render(<CellContents content="numberUp" />);
    expect(container.querySelector('.panw--cell-contents__trend--up')).toBeInTheDocument();
  });

  it('renders trend down arrow', () => {
    const { container } = render(<CellContents content="numberDown" />);
    expect(container.querySelector('.panw--cell-contents__trend--down')).toBeInTheDocument();
  });

  it('renders tag via @ds/tags when tags=true', () => {
    const { container } = render(<CellContents tags tagLabel="X" />);
    expect(container.querySelector('.panw--tag')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
  });

  it('does not render tag when tags=false', () => {
    const { container } = render(<CellContents />);
    expect(container.querySelector('.panw--tag')).not.toBeInTheDocument();
  });

  it('renders state icon for non-none states', () => {
    CellStates.filter((s) => s !== 'none').forEach((state) => {
      const { container, unmount } = render(<CellContents state={state} />);
      expect(container.querySelector(`.panw--cell-contents__state-icon--${state}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('does not render state icon when state=none', () => {
    const { container } = render(<CellContents />);
    expect(container.querySelector('.panw--cell-contents__state-icon')).not.toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef();
    render(<CellContents ref={ref} />);
    expect(ref.current.tagName).toBe('DIV');
  });

  it('handles all content types without crashing', () => {
    CellContentTypes.forEach((c) => {
      const { unmount } = render(<CellContents content={c} />);
      unmount();
    });
  });
});
