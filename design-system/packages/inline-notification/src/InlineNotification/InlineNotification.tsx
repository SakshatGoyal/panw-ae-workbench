import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Info, ExclamationTriangle as AlertTriangle, CircleCheck as CheckCircle, Close as X } from '@ds/icons';
import { XCircle } from 'lucide-react';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { IconButton } from '@ds/button';

export const InlineNotificationTypes = ['info', 'alert', 'error', 'success'] as const;
export type InlineNotificationType = (typeof InlineNotificationTypes)[number];

export const InlineNotificationInfoTypes = ['page-level', 'product-level'] as const;
export type InlineNotificationInfoType = (typeof InlineNotificationInfoTypes)[number];

export interface InlineNotificationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  type?: InlineNotificationType;
  infoType?: InlineNotificationInfoType;
  children: React.ReactNode;
  closeButton?: boolean;
  onClose?: () => void;
}

const TYPE_ICON: Record<InlineNotificationType, React.ElementType> = {
  info: Info,
  alert: AlertTriangle,
  error: XCircle,
  success: CheckCircle,
};

export const InlineNotification = React.forwardRef<HTMLDivElement, InlineNotificationProps>(
  function InlineNotification(
    {
      type = 'info',
      infoType = 'page-level',
      children,
      closeButton = true,
      onClose,
      className,
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();
    const Icon = TYPE_ICON[type];

    const rootClass = classNames(
      `${prefix}--inline-notification`,
      `${prefix}--inline-notification--${type}`,
      `${prefix}--inline-notification--${infoType}`,
      className
    );

    return (
      <div ref={ref} className={rootClass} role="status" {...rest}>
        <div className={`${prefix}--inline-notification__icon-container`}>
          <span className={`${prefix}--inline-notification__icon`} aria-hidden="true">
            <Icon size={16} />
          </span>
        </div>
        <div className={`${prefix}--inline-notification__text-container`}>
          <span className={`${prefix}--inline-notification__text`}>{children}</span>
        </div>
        {closeButton && (
          <div className={`${prefix}--inline-notification__close`}>
            <IconButton
              kind="ghost"
              size="sm"
              iconSize={16}
              renderIcon={X}
              aria-label="Close notification"
              onClick={onClose}
            />
          </div>
        )}
      </div>
    );
  }
);

InlineNotification.displayName = 'InlineNotification';

InlineNotification.propTypes = {
  type: PropTypes.oneOf(InlineNotificationTypes),
  infoType: PropTypes.oneOf(InlineNotificationInfoTypes),
  children: PropTypes.node.isRequired,
  closeButton: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

export default InlineNotification;
