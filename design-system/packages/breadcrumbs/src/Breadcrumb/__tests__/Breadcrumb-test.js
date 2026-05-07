import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Breadcrumb, BreadcrumbItem } from '../../index';

describe('Breadcrumb', () => {
  it('renders all children', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('wraps content in <nav> with default aria-label', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>x</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('marks the last child with aria-current=page', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page');
  });

  it('renders intermediate items as <a> with href', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem>x</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByText('Home').tagName).toBe('A');
  });

  it('renders disabled items with aria-disabled', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem disabled>Locked</BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByText('Locked')).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows the collapse button when collapsed and >2 items', () => {
    render(
      <Breadcrumb collapsed>
        <BreadcrumbItem href="/a">A</BreadcrumbItem>
        <BreadcrumbItem href="/b">B</BreadcrumbItem>
        <BreadcrumbItem href="/c">C</BreadcrumbItem>
        <BreadcrumbItem>D</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(
      screen.getByRole('button', { name: /Show hidden breadcrumbs/i })
    ).toBeInTheDocument();
  });

  it('hides middle items when collapsed', () => {
    render(
      <Breadcrumb collapsed>
        <BreadcrumbItem href="/a">A</BreadcrumbItem>
        <BreadcrumbItem href="/b">B</BreadcrumbItem>
        <BreadcrumbItem href="/c">C</BreadcrumbItem>
        <BreadcrumbItem>D</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.queryByText('B')).not.toBeInTheDocument();
    expect(screen.queryByText('C')).not.toBeInTheDocument();
  });

  it('does not collapse when items <= 2', () => {
    render(
      <Breadcrumb collapsed>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(
      screen.queryByRole('button', { name: /Show hidden breadcrumbs/i })
    ).not.toBeInTheDocument();
  });

  it('fires onExpand when the … button is clicked', () => {
    const handler = vi.fn();
    render(
      <Breadcrumb collapsed onExpand={handler}>
        <BreadcrumbItem href="/a">A</BreadcrumbItem>
        <BreadcrumbItem href="/b">B</BreadcrumbItem>
        <BreadcrumbItem href="/c">C</BreadcrumbItem>
        <BreadcrumbItem>D</BreadcrumbItem>
      </Breadcrumb>
    );
    fireEvent.click(screen.getByRole('button', { name: /Show hidden breadcrumbs/i }));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
