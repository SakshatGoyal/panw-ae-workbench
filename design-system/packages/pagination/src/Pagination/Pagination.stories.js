import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Pagination } from './index';
import mdx from './Pagination.mdx';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    totalItems: { control: 'number' },
    rowsPerPage: { control: 'number' },
    showItemsPerPage: { control: 'boolean' },
    background: { options: ['grey00', 'grey10'], control: 'radio' },
    maxVisiblePages: { control: 'number' },
  },
  parameters: { docs: { page: mdx } },
  tags: ['autodocs'],
};

export const Default = (args) => {
  const [page, setPage] = useState(1);
  const [rpp, setRpp] = useState(args.rowsPerPage ?? 10);
  return (
    <Pagination
      {...args}
      currentPage={page}
      rowsPerPage={rpp}
      onPageChange={(p) => {
        setPage(p);
        action('onPageChange')(p);
      }}
      onRowsPerPageChange={(n) => {
        setRpp(n);
        setPage(1);
        action('onRowsPerPageChange')(n);
      }}
    />
  );
};
Default.args = { totalItems: 247, rowsPerPage: 10, showItemsPerPage: true, background: 'grey00' };

export const FewPages = () => {
  const [p, setP] = useState(2);
  return <Pagination totalItems={30} rowsPerPage={10} currentPage={p} onPageChange={setP} />;
};

export const ManyPages = () => {
  const [p, setP] = useState(7);
  return <Pagination totalItems={500} rowsPerPage={10} currentPage={p} onPageChange={setP} />;
};

export const NoItemsPerPage = () => {
  const [p, setP] = useState(1);
  return <Pagination totalItems={120} rowsPerPage={10} currentPage={p} onPageChange={setP} showItemsPerPage={false} />;
};

export const AllVariants = () => (
  <div style={{ padding: 24, background: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Pagination totalItems={30} rowsPerPage={10} currentPage={1} />
    <Pagination totalItems={120} rowsPerPage={10} currentPage={5} />
    <Pagination totalItems={500} rowsPerPage={10} currentPage={20} />
    <Pagination totalItems={120} rowsPerPage={10} currentPage={5} showItemsPerPage={false} />
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
