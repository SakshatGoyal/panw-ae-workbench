import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Link, LinkSizes, LinkColors } from '../Link';

describe('Link', () => {
  it('renders without crashing', () => {
    render(<Link>Hello</Link>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders as <a> when href is provided', () => {
    render(<Link href="/path">x</Link>);
    expect(screen.getByText('x').tagName).toBe('A');
  });

  it('renders as <span role="link"> when no href', () => {
    render(<Link>x</Link>);
    expect(screen.getByRole('link').tagName).toBe('SPAN');
  });

  it('applies the base link class', () => {
    const { container } = render(<Link>x</Link>);
    expect(container.querySelector('.panw--link')).toBeInTheDocument();
  });

  it('applies the correct class for each size', () => {
    LinkSizes.forEach((size) => {
      const { container, unmount } = render(<Link size={size}>x</Link>);
      expect(container.querySelector(`.panw--link--${size.replace('px', '')}px`)).toBeInTheDocument();
      unmount();
    });
  });

  it('applies the correct class for each color', () => {
    LinkColors.forEach((color) => {
      const { container, unmount } = render(<Link color={color}>x</Link>);
      expect(container.querySelector(`.panw--link--${color}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('applies disabled class and aria-disabled when disabled', () => {
    const { container } = render(<Link disabled>x</Link>);
    expect(container.querySelector('.panw--link--disabled')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not fire onClick when disabled', () => {
    const handler = vi.fn();
    render(<Link disabled onClick={handler}>x</Link>);
    fireEvent.click(screen.getByRole('link'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('fires onClick when not disabled', () => {
    const handler = vi.fn();
    render(<Link onClick={handler}>x</Link>);
    fireEvent.click(screen.getByRole('link'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('renders left icon when leftIcon is true', () => {
    const { container } = render(<Link leftIcon>x</Link>);
    const wraps = container.querySelectorAll('.panw--link__icon-wrap');
    expect(wraps.length).toBe(1);
  });

  it('renders right icon when rightIcon is true', () => {
    const { container } = render(<Link rightIcon>x</Link>);
    expect(container.querySelectorAll('.panw--link__icon-wrap').length).toBe(1);
  });

  it('renders both icons together', () => {
    const { container } = render(<Link leftIcon rightIcon>x</Link>);
    expect(container.querySelectorAll('.panw--link__icon-wrap').length).toBe(2);
  });

  it('forwards ref', () => {
    const ref = React.createRef();
    render(<Link ref={ref} href="#">x</Link>);
    expect(ref.current).not.toBeNull();
    expect(ref.current.tagName).toBe('A');
  });
});
