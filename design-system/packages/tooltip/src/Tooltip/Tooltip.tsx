import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { IconButton } from '@ds/button';

export const TooltipKinds = ['default', 'descriptive'] as const;
export type TooltipKind = (typeof TooltipKinds)[number];

export const TooltipDirections = ['top', 'bottom', 'left', 'right'] as const;
export type TooltipDirection = (typeof TooltipDirections)[number];

export const TooltipPositions = ['left', 'middle', 'right', 'top', 'bottom'] as const;
export type TooltipPosition = (typeof TooltipPositions)[number];

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Visual variant. `default` is dark with text only; `descriptive` is light with heading + image + stepper. */
  kind?: TooltipKind;
  pointerDirection?: TooltipDirection;
  pointerPosition?: TooltipPosition;
  /** Plain text — kind=default. */
  content?: string;
  /** kind=descriptive only */
  heading?: string;
  showHeading?: boolean;
  description?: string;
  showDescription?: boolean;
  showImage?: boolean;
  image?: React.ReactNode;
  showStepper?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

function Arrow({ kind, direction }: { kind: TooltipKind; direction: TooltipDirection }) {
  const isDescriptive = kind === 'descriptive';
  const cls = 'panw--tooltip__arrow';
  if (direction === 'top') {
    return isDescriptive ? (
      <svg className={cls} viewBox="0 0 18 10" fill="currentColor" aria-hidden="true">
        <path d="M9 0L18 10H0L9 0Z" />
      </svg>
    ) : (
      <svg className={cls} viewBox="0 0 9 5" fill="currentColor" aria-hidden="true">
        <path d="M4.5 0L9 5H0L4.5 0Z" />
      </svg>
    );
  }
  if (direction === 'bottom') {
    return isDescriptive ? (
      <svg className={cls} viewBox="0 0 18 10" fill="currentColor" aria-hidden="true">
        <path d="M9 10L0 0H18L9 10Z" />
      </svg>
    ) : (
      <svg className={cls} viewBox="0 0 9 5" fill="currentColor" aria-hidden="true">
        <path d="M4.5 5L0 0H9L4.5 5Z" />
      </svg>
    );
  }
  if (direction === 'left') {
    return isDescriptive ? (
      <svg className={cls} viewBox="0 0 10 18" fill="currentColor" aria-hidden="true">
        <path d="M0 9L10 0V18L0 9Z" />
      </svg>
    ) : (
      <svg className={cls} viewBox="0 0 5 9" fill="currentColor" aria-hidden="true">
        <path d="M0 4.5L5 0V9L0 4.5Z" />
      </svg>
    );
  }
  return isDescriptive ? (
    <svg className={cls} viewBox="0 0 10 18" fill="currentColor" aria-hidden="true">
      <path d="M10 9L0 18V0L10 9Z" />
    </svg>
  ) : (
    <svg className={cls} viewBox="0 0 5 9" fill="currentColor" aria-hidden="true">
      <path d="M5 4.5L0 9V0L5 4.5Z" />
    </svg>
  );
}

function normalizePosition(direction: TooltipDirection, position: TooltipPosition): string {
  if (direction === 'top' || direction === 'bottom') {
    if (position === 'top') return 'left';
    if (position === 'bottom') return 'right';
    return position;
  }
  if (position === 'left') return 'top';
  if (position === 'right') return 'bottom';
  return position;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  {
    kind = 'default',
    pointerDirection = 'top',
    pointerPosition = 'left',
    content = "Sample content for a tooltip that shouldn't be more than a couple of lines.",
    heading = 'Small Heading',
    showHeading = true,
    description = 'Sample content for a descriptive tooltip.',
    showDescription = true,
    showImage = true,
    image,
    showStepper = true,
    currentPage,
    totalPages = 3,
    onPageChange,
    className,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const [internalPage, setInternalPage] = useState(1);
  const page = currentPage ?? internalPage;

  const goPrev = useCallback(() => {
    const next = Math.max(1, page - 1);
    setInternalPage(next);
    onPageChange?.(next);
  }, [page, onPageChange]);
  const goNext = useCallback(() => {
    const next = Math.min(totalPages, page + 1);
    setInternalPage(next);
    onPageChange?.(next);
  }, [page, totalPages, onPageChange]);

  const normalized = normalizePosition(pointerDirection, pointerPosition);

  const rootClass = classNames(
    `${prefix}--tooltip`,
    `${prefix}--tooltip--type-${kind}`,
    `${prefix}--tooltip--direction-${pointerDirection}`,
    `${prefix}--tooltip--position-${normalized}`,
    className
  );

  return (
    <div ref={ref} className={rootClass} role="tooltip" {...rest}>
      <div className={`${prefix}--tooltip__pointer-container`}>
        <Arrow kind={kind} direction={pointerDirection} />
      </div>
      {kind === 'default' ? (
        <div className={`${prefix}--tooltip__content-container`}>
          <p className={`${prefix}--tooltip__text`}>{content}</p>
        </div>
      ) : (
        <div className={`${prefix}--tooltip__content-container`}>
          {showHeading && <p className={`${prefix}--tooltip__heading`}>{heading}</p>}
          {showImage && (
            <div className={`${prefix}--tooltip__image`} role="img" aria-label="Tooltip image">
              {image}
            </div>
          )}
          {showDescription && (
            <p className={`${prefix}--tooltip__description`}>{description}</p>
          )}
          {showStepper && (
            <div className={`${prefix}--tooltip__pagination`}>
              <span className={`${prefix}--tooltip__page-info`}>
                {page} of {totalPages}
              </span>
              <div className={`${prefix}--tooltip__navigation`}>
                <IconButton
                  kind="ghost"
                  size="sm"
                  iconSize={16}
                  shape="rounded"
                  renderIcon={ChevronLeft}
                  aria-label="Previous"
                  onClick={goPrev}
                  disabled={page <= 1}
                />
                <IconButton
                  kind="ghost"
                  size="sm"
                  iconSize={16}
                  shape="rounded"
                  renderIcon={ChevronRight}
                  aria-label="Next"
                  onClick={goNext}
                  disabled={page >= totalPages}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
  kind: PropTypes.oneOf(TooltipKinds),
  pointerDirection: PropTypes.oneOf(TooltipDirections),
  pointerPosition: PropTypes.oneOf(TooltipPositions),
  content: PropTypes.string,
  heading: PropTypes.string,
  showHeading: PropTypes.bool,
  description: PropTypes.string,
  showDescription: PropTypes.bool,
  showImage: PropTypes.bool,
  image: PropTypes.node,
  showStepper: PropTypes.bool,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
  className: PropTypes.string,
};

/** Convenience wrapper — same component locked to `kind="descriptive"`. */
export const DescriptiveTooltip = React.forwardRef<HTMLDivElement, Omit<TooltipProps, 'kind'>>(
  function DescriptiveTooltip(props, ref) {
    return <Tooltip ref={ref} kind="descriptive" {...props} />;
  }
);
DescriptiveTooltip.displayName = 'DescriptiveTooltip';

export default Tooltip;
