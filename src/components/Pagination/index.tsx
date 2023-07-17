import {FC} from 'react';
import Stack from '@mui/material/Stack';
import {MenuItem} from '@mui/material';
import {observer} from 'mobx-react';
import {Styled} from './Pagination.styles';
import {usePaginationApp} from './Pagination.hook';
import { BackendPaginationStore } from 'stores/BackendPagination';

interface IPaginationApp {
    pagination: BackendPaginationStore
    onChangePage?:(page: number) => void
    onClickButtonSize?: (size: number) => void
}

export const PaginationApp:FC<IPaginationApp> = observer((props) => {
  const {
    pagination,
    onChangePage,
    onClickButtonSize,
  } = props;

  const {
    open,
    anchorEl,
    handleClick,
    handleClose,
    onPaginationChange,
  } = usePaginationApp(onChangePage);

  return (
    <Styled.PaginationContent>
      <Styled.ButtonContent>
        <Styled.LabelButtonStyle variant='h4'>Show</Styled.LabelButtonStyle>
        <Styled.ButtonStyle
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="outlined"
          disableElevation
          onClick={handleClick}
          size="small"
          endIcon={<Styled.KeyboardArrowDownIconStyled />}
        >
          {pagination.size}
        </Styled.ButtonStyle>
        <Styled.StyledMenu
          id="demo-customized-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {
            pagination.sizeList.map((item) => {
              return (
                <MenuItem
                  key={`pagination-page-${item}`}
                  disableRipple
                  value={item}
                  onClick={(e) => {
                    handleClose();
                    onClickButtonSize(item);
                  }}
                >
                  {item}
                </MenuItem>
              );
            })
          }
        </Styled.StyledMenu>
      </Styled.ButtonContent>
      <Stack>
        <Styled.PaginationStyle
          count={pagination.totalPages}
          shape={'rounded'}
          size={'large'}
          onChange={onPaginationChange}
          defaultPage={(pagination.number + 1)}
        />
      </Stack>
    </Styled.PaginationContent>
  );
});
