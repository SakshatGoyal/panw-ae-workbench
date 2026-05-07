import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { IconButton } from '@ds/button';

export const PopoverDirections = ['top', 'bottom', 'left', 'right'] as const;
export type PopoverDirection = (typeof PopoverDirections)[number];

export const PopoverPositions = ['left', 'middle', 'right', 'top', 'bottom'] as const;
export type PopoverPosition = (typeof PopoverPositions)[number];

export const PopoverDensities = ['short', 'structured'] as const;
export type PopoverDensity = (typeof PopoverDensities)[number];

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  pointerDirection?: PopoverDirection;
  pointerPosition?: PopoverPosition;
  /** `short` = 12px content padding (heading + body only). `structured` = 16px (heading + image + paginated body). */
  density?: PopoverDensity;
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
  /** Custom body content. When provided, replaces description/image. Stepper still rendered if `showStepper`. */
  children?: React.ReactNode;
}

function Arrow({ direction }: { direction: PopoverDirection }) {
  const cls = 'panw--popover__arrow';
  if (direction === 'top') {
    return (
      <svg className={cls} viewBox="0 0 18 10" fill="currentColor" aria-hidden="true">
        <path d="M9 0L18 10H0L9 0Z" />
      </svg>
    );
  }
  if (direction === 'bottom') {
    return (
      <svg className={cls} viewBox="0 0 18 10" fill="currentColor" aria-hidden="true">
        <path d="M9 10L0 0H18L9 10Z" />
      </svg>
    );
  }
  if (direction === 'left') {
    return (
      <svg className={cls} viewBox="0 0 10 18" fill="currentColor" aria-hidden="true">
        <path d="M0 9L10 0V18L0 9Z" />
      </svg>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 10 18" fill="currentColor" aria-hidden="true">
      <path d="M10 9L0 18V0L10 9Z" />
    </svg>
  );
}

function normalizePosition(direction: PopoverDirection, position: PopoverPosition): string {
  if (direction === 'top' || direction === 'bottom') {
    if (position === 'top') return 'left';
    if (position === 'bottom') return 'right';
    return position;
  }
  if (position === 'left') return 'top';
  if (position === 'right') return 'bottom';
  return position;
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  {
    pointerDirection = 'top',
    pointerPosition = 'left',
    density = 'structured',
    heading = 'Small Heading',
    showHeading = true,
    description = 'Sample content for a popover.',
    showDescription = true,
    showImage = true,
    image,
    showStepper = true,
    currentPage,
    totalPages = 3,
    onPageChange,
    className,
    children,
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
    `${prefix}--popover`,
    `${prefix}--popover--density-${density}`,
    `${prefix}--popover--direction-${pointerDirection}`,
    `${prefix}--popover--position-${normalized}`,
    className
  );

  const showRichBody = density === 'structured';

  return (
    <div ref={ref} className={rootClass} role="dialog" {...rest}>
      <div className={`${prefix}--popover__pointer-container`}>
        <Arrow direction={pointerDirection} />
      </div>
      <div className={`${prefix}--popover__content-container`}>
        {showHeading && <p className={`${prefix}--popover__heading`}>{heading}</p>}
        {showRichBody && showImage && (
          <div className={`${prefix}--popover__image`} role="img" aria-label="Popover image">
            {image}
          </div>
        )}
        {children
          ? <div className={`${prefix}--popover__body`}>{children}</div>
          : showDescription && (
            <p className={`${prefix}--popover__description`}>{description}</p>
          )}
        {showStepper && (
          <div className={`${prefix}--popover__pagination`}>
            <span className={`${prefix}--popover__page-info`}>
              {page} of {totalPages}
            </span>
            <div className={`${prefix}--popover__navigation`}>
              <IconButton
                kind="ghost"
                size="sm"
                iconSize={16}
                renderIcon={ChevronLeft}
                aria-label="Previous"
                onClick={goPrev}
                disabled={page <= 1}
              />
              <IconButton
                kind="ghost"
                size="sm"
                iconSize={16}
                renderIcon={ChevronRight}
                aria-label="Next"
                onClick={goNext}
                disabled={page >= totalPages}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

Popover.displayName = 'Popover';

Popover.propTypes = {
  pointerDirection: PropTypes.oneOf(PopoverDirections),
  pointerPosition: PropTypes.oneOf(PopoverPositions),
  density: PropTypes.oneOf(PopoverDensities),
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
  children: PropTypes.node,
};

export default Popover;
