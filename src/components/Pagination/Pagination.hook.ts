import {ChangeEvent, MouseEvent, useCallback, useState} from 'react';

export const usePaginationApp = (
  onChangePage?:(page: number) => void,
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
    onChangePage && onChangePage(page);
  }, [onChangePage]);

  return {
    open,
    anchorEl,
    handleClick,
    handleClose,
    onPaginationChange,
  };
};
