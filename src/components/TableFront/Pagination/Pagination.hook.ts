/* eslint-disable no-console */
import {ChangeEvent, MouseEvent, useCallback, useState} from 'react';
import {PaginationStore} from './Pagination.store';

export const usePaginationApp = (
  pagination: PaginationStore,
) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onPaginationChange = useCallback((event: ChangeEvent<unknown>, page: number) => {
    pagination.handleChangePage((page - 1));
  }, [pagination]);

  return {
    open,
    anchorEl,
    handleClick,
    handleClose,
    onPaginationChange,
  };
};
