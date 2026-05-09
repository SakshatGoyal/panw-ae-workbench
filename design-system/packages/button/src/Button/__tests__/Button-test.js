/**
 * Smoke tests for Button.
 * Follows Carbon's test conventions: single describe block, named tests,
 * @testing-library/react with getByRole / toHaveClass / toHaveAttribute.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button, { ButtonKinds, ButtonSizes } from '../Button';
import { Plus } from 'lucide-react';

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button>Label</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders children as label text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders as a <button> element by default', () => {
    render(<Button>Label</Button>);
    expect(screen.getByRole('button').tagName).toBe('BUTTON');
  });

  it('sets type="button" by default', () => {
    render(<Button>Label</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('applies the base btn class', () => {
    render(<Button>Label</Button>);
    expect(screen.getByRole('button')).toHaveClass('panw--btn');
  });

  it('applies the default kind class (primary)', () => {
    render(<Button>Label</Button>);
    expect(screen.getByRole('button')).toHaveClass('panw--btn--primary');
  });

  it('applies the correct class for each kind', () => {
    ButtonKinds.forEach((kind) => {
      const { unmount } = render(<Button kind={kind}>Label</Button>);
      expect(screen.getByRole('button')).toHaveClass(`panw--btn--${kind}`);
      unmount();
    });
  });

  it('applies the correct class for each size', () => {
    ButtonSizes.forEach((size) => {
      const { unmount } = render(<Button size={size}>Label</Button>);
      expect(screen.getByRole('button')).toHaveClass(`panw--btn--${size}`);
      unmount();
    });
  });

  it('sets disabled attribute when disabled prop is true', () => {
    render(<Button disabled>Label</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not set disabled attribute when disabled is false', () => {
    render(<Button disabled={false}>Label</Button>);
    expect(screen.getByRole('button')).toBeEnabled();
  });

  it('applies disabled class when disabled', () => {
    render(<Button disabled>Label</Button>);
    expect(screen.getByRole('button')).toHaveClass('panw--btn--disabled');
  });

  it('fires onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Click
      </Button>
    );
    // disabled button element does not fire click events natively
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders as <a> when href is provided', () => {
    render(<Button href="https://example.com">Link</Button>);
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
  });

  it('renders as a custom element when as prop is provided', () => {
    function CustomEl(props) {
      return <div data-testid="custom" {...props} />;
    }
    render(<Button as={CustomEl}>Label</Button>);
    expect(screen.getByTestId('custom')).toBeInTheDocument();
  });

  it('forwards ref to the underlying element', () => {
    const ref = React.createRef();
    render(<Button ref={ref}>Label</Button>);
    expect(ref.current).not.toBeNull();
    expect(ref.current.tagName).toBe('BUTTON');
  });

  it('merges custom className with generated classes', () => {
    render(<Button className="custom-class">Label</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('custom-class');
    expect(btn).toHaveClass('panw--btn');
  });

  it('renders renderIcon element when provided', () => {
    render(
      <Button renderIcon={(props) => <Plus data-testid="icon" size={16} {...props} />}>
        With Icon
      </Button>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders icon in the icon wrapper span', () => {
    const { container } = render(
      <Button renderIcon={(props) => <Plus size={16} {...props} />}>Label</Button>
    );
    expect(container.querySelector('.panw--btn__icon')).toBeInTheDocument();
  });
});
