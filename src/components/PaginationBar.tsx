import React from 'react';
import { Pagination } from '@mui/material';

interface PaginationProps {
  page: number
  count: number
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void
}

const PaginationBar = ({
  page,
  count,
  onPageChange,
}: PaginationProps) => (
  <Pagination
    page={page}
    count={count}
    onChange={onPageChange}
    sx={{
      margin: '25px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  />
);

export default PaginationBar;
