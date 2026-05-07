import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProgressStep, ProgressStepItem, ProgressStatuses } from '../../index';

describe('ProgressStep', () => {
  it('renders all child items', () => {
    render(
      <ProgressStep>
        <ProgressStepItem label="A" status="success" />
        <ProgressStepItem label="B" status="active" />
        <ProgressStepItem label="C" status="inactive" />
      </ProgressStep>
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('applies stepper size class', () => {
    const { container } = render(
      <ProgressStep size="compact">
        <ProgressStepItem label="A" status="active" />
      </ProgressStep>
    );
    expect(container.querySelector('.panw--ps-stepper--compact')).toBeInTheDocument();
  });

  it('applies the status class to each item', () => {
    ProgressStatuses.forEach((status) => {
      const { container, unmount } = render(
        <ProgressStep>
          <ProgressStepItem label="x" status={status} />
        </ProgressStep>
      );
      expect(container.querySelector(`.panw--ps-step--${status}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('renders numbered indicator for active and inactive', () => {
    render(
      <ProgressStep>
        <ProgressStepItem label="A" status="active" />
        <ProgressStepItem label="B" status="inactive" />
      </ProgressStep>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders icon indicator for success/warning/error', () => {
    const { container } = render(
      <ProgressStep>
        <ProgressStepItem label="ok" status="success" />
        <ProgressStepItem label="warn" status="warning" />
        <ProgressStepItem label="err" status="error" />
      </ProgressStep>
    );
    expect(container.querySelector('.panw--ps-step__icon--success')).toBeInTheDocument();
    expect(container.querySelector('.panw--ps-step__icon--warning')).toBeInTheDocument();
    expect(container.querySelector('.panw--ps-step__icon--error')).toBeInTheDocument();
  });

  it('renders description when showDescription=true', () => {
    render(
      <ProgressStep showDescription>
        <ProgressStepItem label="A" description="Detail" status="active" />
      </ProgressStep>
    );
    expect(screen.getByText('Detail')).toBeInTheDocument();
  });

  it('hides description when showDescription=false', () => {
    render(
      <ProgressStep showDescription={false}>
        <ProgressStepItem label="A" description="Detail" status="active" />
      </ProgressStep>
    );
    expect(screen.queryByText('Detail')).not.toBeInTheDocument();
  });

  it('makes the step a button when onClick is provided', () => {
    render(
      <ProgressStep>
        <ProgressStepItem label="A" status="active" onClick={() => {}} />
      </ProgressStep>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('fires onClick when clicked', () => {
    const handler = vi.fn();
    render(
      <ProgressStep>
        <ProgressStepItem label="A" status="active" onClick={handler} />
      </ProgressStep>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
