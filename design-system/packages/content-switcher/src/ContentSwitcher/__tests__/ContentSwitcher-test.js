import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { List } from '@ds/icons';
import { ContentSwitcher, ContentSwitcherSizes } from '../ContentSwitcher';

const items = [{ label: 'A' }, { label: 'B' }, { label: 'C' }];

describe('ContentSwitcher', () => {
  it('renders all items', () => {
    render(<ContentSwitcher items={items} selectedIndex={0} />);
    items.forEach(({ label }) => expect(screen.getByText(label)).toBeInTheDocument());
  });

  it('container has role=tablist', () => {
    render(<ContentSwitcher items={items} selectedIndex={0} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders each segment as role=tab', () => {
    render(<ContentSwitcher items={items} selectedIndex={0} />);
    expect(screen.getAllByRole('tab')).toHaveLength(items.length);
  });

  it('marks selected segment with aria-selected=true', () => {
    render(<ContentSwitcher items={items} selectedIndex={1} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('uses roving tabindex', () => {
    render(<ContentSwitcher items={items} selectedIndex={2} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[2]).toHaveAttribute('tabindex', '0');
    expect(tabs[0]).toHaveAttribute('tabindex', '-1');
  });

  it('fires onChange with new index on click', () => {
    const handler = vi.fn();
    render(<ContentSwitcher items={items} selectedIndex={0} onChange={handler} />);
    fireEvent.click(screen.getAllByRole('tab')[2]);
    expect(handler).toHaveBeenCalledWith(2);
  });

  it('does not fire onChange when clicking the already-selected segment', () => {
    const handler = vi.fn();
    render(<ContentSwitcher items={items} selectedIndex={0} onChange={handler} />);
    fireEvent.click(screen.getAllByRole('tab')[0]);
    expect(handler).not.toHaveBeenCalled();
  });

  it('does not fire onChange when disabled', () => {
    const handler = vi.fn();
    render(<ContentSwitcher items={items} selectedIndex={0} onChange={handler} disabled />);
    fireEvent.click(screen.getAllByRole('tab')[1]);
    expect(handler).not.toHaveBeenCalled();
  });

  it('applies size class to each item', () => {
    ContentSwitcherSizes.forEach((size) => {
      const { container, unmount } = render(
        <ContentSwitcher items={items} selectedIndex={0} size={size} />
      );
      expect(container.querySelector(`.panw--content-switcher__item--${size}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('applies bg-gray00 class when background=gray00', () => {
    const { container } = render(
      <ContentSwitcher items={items} selectedIndex={0} background="gray00" />
    );
    expect(container.querySelector('.panw--content-switcher--bg-gray00')).toBeInTheDocument();
  });

  it('renders icons via renderIcon', () => {
    const withIcon = [{ label: 'List', renderIcon: List }];
    const { container } = render(<ContentSwitcher items={withIcon} selectedIndex={0} />);
    expect(container.querySelector('.panw--content-switcher__icon')).toBeInTheDocument();
  });

  it('forwards ref to container', () => {
    const ref = React.createRef();
    render(<ContentSwitcher ref={ref} items={items} selectedIndex={0} />);
    expect(ref.current.tagName).toBe('DIV');
  });
});
