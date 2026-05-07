import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle, ToggleSizes, ToggleLabelPositions } from '../Toggle';

describe('Toggle', () => {
  it('renders without crashing', () => {
    render(<Toggle label="Notifications" />);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('renders a switch role', () => {
    render(<Toggle label="x" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('reflects on=true on the input', () => {
    render(<Toggle label="x" on />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('reflects on=false on the input', () => {
    render(<Toggle label="x" on={false} />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('applies the off class to the track when off', () => {
    const { container } = render(<Toggle label="x" on={false} />);
    expect(container.querySelector('.panw--toggle-track--off')).toBeInTheDocument();
  });

  it('renders status text Yes/No by default', () => {
    const { rerender } = render(<Toggle label="x" on />);
    expect(screen.getByText('Yes')).toBeInTheDocument();
    rerender(<Toggle label="x" on={false} />);
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('renders custom status text', () => {
    render(<Toggle label="x" on onStatusText="Enabled" offStatusText="Disabled" />);
    expect(screen.getByText('Enabled')).toBeInTheDocument();
  });

  it('hides status text when showStatus=false', () => {
    render(<Toggle label="x" on showStatus={false} />);
    expect(screen.queryByText('Yes')).not.toBeInTheDocument();
  });

  it('applies size classes', () => {
    ToggleSizes.forEach((size) => {
      const { container, unmount } = render(<Toggle label="x" size={size} />);
      if (size === 'small') {
        expect(container.querySelector('.panw--toggle-track--small')).toBeInTheDocument();
      }
      unmount();
    });
  });

  it('applies top layout class when labelPosition=top', () => {
    const { container } = render(<Toggle label="x" labelPosition="top" />);
    expect(container.querySelector('.panw--toggle-root--top')).toBeInTheDocument();
  });

  it('renders for each labelPosition', () => {
    ToggleLabelPositions.forEach((pos) => {
      const { unmount } = render(<Toggle label="x" labelPosition={pos} />);
      expect(screen.getByText('x')).toBeInTheDocument();
      unmount();
    });
  });

  it('renders info icon when showInfo', () => {
    const { container } = render(<Toggle label="x" showInfo />);
    expect(container.querySelector('.panw--toggle-info-icon')).toBeInTheDocument();
  });

  it('fires onChange with toggled value', () => {
    const handler = vi.fn();
    render(<Toggle label="x" on onChange={handler} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0]).toBe(false);
  });

  it('does not fire onChange when disabled', () => {
    const handler = vi.fn();
    render(<Toggle label="x" disabled onChange={handler} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('forwards ref to the input', () => {
    const ref = React.createRef();
    render(<Toggle ref={ref} label="x" />);
    expect(ref.current.tagName).toBe('INPUT');
  });
});
