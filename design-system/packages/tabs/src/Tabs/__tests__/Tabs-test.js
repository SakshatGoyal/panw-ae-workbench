import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from '../Tabs';
import { Tab } from '../../Tab';

describe('Tabs', () => {
  it('renders tab list', () => {
    render(
      <Tabs selectedIndex={0}>
        <Tab label="A" />
        <Tab label="B" />
      </Tabs>
    );
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(2);
  });

  it('marks the selected tab via aria-selected', () => {
    render(
      <Tabs selectedIndex={1}>
        <Tab label="A" />
        <Tab label="B" />
      </Tabs>
    );
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('fires onChange with the clicked index', () => {
    const fn = vi.fn();
    render(
      <Tabs selectedIndex={0} onChange={fn}>
        <Tab label="A" />
        <Tab label="B" />
        <Tab label="C" />
      </Tabs>
    );
    fireEvent.click(screen.getByRole('tab', { name: 'C' }));
    expect(fn).toHaveBeenCalledWith(2);
  });

  it('disabled tab does not fire onChange', () => {
    const fn = vi.fn();
    render(
      <Tabs selectedIndex={0} onChange={fn}>
        <Tab label="A" />
        <Tab label="B" disabled />
      </Tabs>
    );
    fireEvent.click(screen.getByRole('tab', { name: 'B' }));
    expect(fn).not.toHaveBeenCalled();
  });

  it('renders the @ds/tags Tags chip when showTag', () => {
    const { container } = render(
      <Tabs selectedIndex={0}>
        <Tab label="A" showTag tagLabel="N" />
      </Tabs>
    );
    expect(container.querySelector('.panw--tag')).toBeInTheDocument();
    expect(screen.getByText('N')).toBeInTheDocument();
  });

  it('container=false applies the no-container class', () => {
    const { container } = render(
      <Tabs selectedIndex={0} container={false}>
        <Tab label="A" />
      </Tabs>
    );
    expect(container.querySelector('.panw--tabs__item--no-container')).toBeInTheDocument();
  });

  it('selected tab is tabIndex=0; unselected tabs are tabIndex=-1', () => {
    render(
      <Tabs selectedIndex={0}>
        <Tab label="A" />
        <Tab label="B" />
      </Tabs>
    );
    const [a, b] = screen.getAllByRole('tab');
    expect(a).toHaveAttribute('tabIndex', '0');
    expect(b).toHaveAttribute('tabIndex', '-1');
  });

  it('forwards ref to root div', () => {
    const ref = React.createRef();
    render(
      <Tabs ref={ref} selectedIndex={0}>
        <Tab label="A" />
      </Tabs>
    );
    expect(ref.current.tagName).toBe('DIV');
  });
});
