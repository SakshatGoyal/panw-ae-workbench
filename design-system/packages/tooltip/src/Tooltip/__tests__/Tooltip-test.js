import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tooltip } from '../Tooltip';

describe('Tooltip', () => {
  it('renders text content', () => {
    render(<Tooltip content="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('applies direction class', () => {
    const { container } = render(<Tooltip pointerDirection="bottom" />);
    expect(container.querySelector('.panw--tooltip--direction-bottom')).toBeInTheDocument();
  });

  it('does not render a pointer arrow', () => {
    const { container } = render(<Tooltip />);
    expect(container.querySelector('.panw--tooltip__arrow')).toBeNull();
    expect(container.querySelector('.panw--tooltip__pointer-container')).toBeNull();
  });

  it('forwards ref', () => {
    const ref = React.createRef();
    render(<Tooltip ref={ref} />);
    expect(ref.current.tagName).toBe('DIV');
  });

  it('renders a single text container only (no descriptive heading/image/stepper)', () => {
    const { container } = render(<Tooltip content="Glance" />);
    expect(container.querySelector('.panw--tooltip__heading')).toBeNull();
    expect(container.querySelector('.panw--tooltip__image')).toBeNull();
    expect(container.querySelector('.panw--tooltip__pagination')).toBeNull();
    expect(screen.getByText('Glance')).toBeInTheDocument();
  });
});
