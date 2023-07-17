import {Table as MuiTable, TableBody} from '@mui/material';
import {ReactElement, ReactNode} from 'react';
import {observer} from 'mobx-react';
import {StyledBodyTable as Styled} from './TableStyles';
import {ITableStore} from './ITableStore';
import {TableHead} from '../TableHead/TableHead';
import { PaginationApp } from 'components/Pagination';

type Props<T> = {
  store: ITableStore<T>;
  children: ReactNode;
  size?: 'small' | 'medium'
}

function BaseTable<T>(props: Props<T>): ReactElement {
  const {store, children, size='small'} = props;

  return (
    <Styled.Container>
      <Styled.TableContainerStyled>
        <MuiTable size={size}>
          <TableHead
            store={store.head}
          />
          <TableBody>
            {children}
          </TableBody>
        </MuiTable>
      </Styled.TableContainerStyled>
      <PaginationApp
        pagination={store.pagination.pagination}
        onChangePage={store.pagination.onChangePage}
        onClickButtonSize={store.pagination.onChangePageSize}
      />
    </Styled.Container>
  );
};

export const Table = observer(BaseTable);
