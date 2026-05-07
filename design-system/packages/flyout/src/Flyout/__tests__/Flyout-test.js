import React, { useRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Flyout,
  FlyoutFilter,
  FlyoutList,
  FlyoutItem,
  FlyoutGroup,
  FlyoutSelectAll,
  FlyoutFooter,
} from '../index';

function Harness({ open = true, mode = 'single', selected = [], onSelectionChange = () => {}, children }) {
  const anchorRef = useRef(null);
  return (
    <div>
      <button ref={anchorRef} type="button">anchor</button>
      <Flyout
        open={open}
        onOpenChange={() => {}}
        anchorRef={anchorRef}
        mode={mode}
        selected={selected}
        onSelectionChange={onSelectionChange}>
        {children}
      </Flyout>
    </div>
  );
}

describe('Flyout', () => {
  it('renders the listbox role when open', () => {
    render(
      <Harness>
        <FlyoutList>
          <FlyoutItem value="a">Alpha</FlyoutItem>
        </FlyoutList>
      </Harness>
    );
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Harness open={false}>
        <FlyoutList>
          <FlyoutItem value="a">Alpha</FlyoutItem>
        </FlyoutList>
      </Harness>
    );
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('aria-multiselectable matches mode', () => {
    const { rerender } = render(
      <Harness mode="single">
        <FlyoutList>
          <FlyoutItem value="a">Alpha</FlyoutItem>
        </FlyoutList>
      </Harness>
    );
    expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'false');

    rerender(
      <Harness mode="multiple">
        <FlyoutList>
          <FlyoutItem value="a">Alpha</FlyoutItem>
        </FlyoutList>
      </Harness>
    );
    expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true');
  });

  it('fires onSelectionChange with single value in single mode', () => {
    const onSelect = vi.fn();
    render(
      <Harness onSelectionChange={onSelect}>
        <FlyoutList>
          <FlyoutItem value="a">Alpha</FlyoutItem>
          <FlyoutItem value="b">Bravo</FlyoutItem>
        </FlyoutList>
      </Harness>
    );
    fireEvent.click(screen.getByText('Alpha'));
    expect(onSelect).toHaveBeenCalledWith(['a']);
  });

  it('toggles values in multiple mode', () => {
    const onSelect = vi.fn();
    render(
      <Harness mode="multiple" selected={['a']} onSelectionChange={onSelect}>
        <FlyoutList>
          <FlyoutItem value="a">Alpha</FlyoutItem>
          <FlyoutItem value="b">Bravo</FlyoutItem>
        </FlyoutList>
      </Harness>
    );
    fireEvent.click(screen.getByText('Bravo'));
    expect(onSelect).toHaveBeenCalledWith(['a', 'b']);
  });

  it('substring-filters items by label', () => {
    render(
      <Harness>
        <FlyoutFilter autoFocus={false} />
        <FlyoutList>
          <FlyoutItem value="apple">Apple</FlyoutItem>
          <FlyoutItem value="banana">Banana</FlyoutItem>
          <FlyoutItem value="apricot">Apricot</FlyoutItem>
        </FlyoutList>
      </Harness>
    );
    const filterInput = screen.getByPlaceholderText('Filter');
    fireEvent.change(filterInput, { target: { value: 'ap' } });
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Apricot')).toBeInTheDocument();
    expect(screen.queryByText('Banana')).toBeNull();
  });

  it('SelectAll renders only in multiple mode', () => {
    const { rerender } = render(
      <Harness mode="single">
        <FlyoutSelectAll />
        <FlyoutList>
          <FlyoutItem value="a">Alpha</FlyoutItem>
        </FlyoutList>
      </Harness>
    );
    expect(screen.queryByText('Select all')).toBeNull();

    rerender(
      <Harness mode="multiple">
        <FlyoutSelectAll />
        <FlyoutList>
          <FlyoutItem value="a">Alpha</FlyoutItem>
        </FlyoutList>
      </Harness>
    );
    expect(screen.getByText('Select all')).toBeInTheDocument();
  });

  it('Group toggles open state on header click', () => {
    render(
      <Harness>
        <FlyoutList>
          <FlyoutGroup label="Foods" defaultOpen={false}>
            <FlyoutItem value="apple">Apple</FlyoutItem>
          </FlyoutGroup>
        </FlyoutList>
      </Harness>
    );
    expect(screen.queryByText('Apple')).toBeNull();
    fireEvent.click(screen.getByText('Foods'));
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('disabled item does not fire onSelectionChange', () => {
    const onSelect = vi.fn();
    render(
      <Harness onSelectionChange={onSelect}>
        <FlyoutList>
          <FlyoutItem value="a" disabled>Alpha</FlyoutItem>
        </FlyoutList>
      </Harness>
    );
    fireEvent.click(screen.getByText('Alpha'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('Footer renders children', () => {
    render(
      <Harness>
        <FlyoutList>
          <FlyoutItem value="a">Alpha</FlyoutItem>
        </FlyoutList>
        <FlyoutFooter>
          <button type="button">Apply</button>
        </FlyoutFooter>
      </Harness>
    );
    expect(screen.getByText('Apply')).toBeInTheDocument();
  });
});
