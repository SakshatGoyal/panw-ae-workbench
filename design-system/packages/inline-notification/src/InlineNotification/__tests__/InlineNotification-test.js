import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InlineNotification, InlineNotificationTypes } from '../InlineNotification';

describe('InlineNotification', () => {
  it('renders children', () => {
    render(<InlineNotification>Hello</InlineNotification>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('has role status', () => {
    render(<InlineNotification>X</InlineNotification>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies type and infoType classes', () => {
    InlineNotificationTypes.forEach((t) => {
      const { container, unmount } = render(
        <InlineNotification type={t} infoType="page-level">X</InlineNotification>
      );
      expect(container.querySelector(`.panw--inline-notification--${t}`)).toBeInTheDocument();
      expect(container.querySelector('.panw--inline-notification--page-level')).toBeInTheDocument();
      unmount();
    });
  });

  it('renders the close IconButton when closeButton=true', () => {
    render(<InlineNotification>X</InlineNotification>);
    expect(screen.getByRole('button', { name: /Close notification/i })).toBeInTheDocument();
  });

  it('hides the close button when closeButton=false', () => {
    render(<InlineNotification closeButton={false}>X</InlineNotification>);
    expect(screen.queryByRole('button', { name: /Close notification/i })).not.toBeInTheDocument();
  });

  it('fires onClose when close clicked', () => {
    const fn = vi.fn();
    render(<InlineNotification onClose={fn}>X</InlineNotification>);
    fireEvent.click(screen.getByRole('button', { name: /Close notification/i }));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('forwards ref', () => {
    const ref = React.createRef();
    render(<InlineNotification ref={ref}>X</InlineNotification>);
    expect(ref.current.tagName).toBe('DIV');
  });

  it('passes through className', () => {
    const { container } = render(<InlineNotification className="extra">X</InlineNotification>);
    expect(container.querySelector('.panw--inline-notification.extra')).toBeInTheDocument();
  });
});
