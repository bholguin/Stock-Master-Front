import {ReactElement} from 'react';
import {Box, TableCell, TableRow} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {observer} from 'mobx-react';
import {Styled} from './TableHeadStyles';
import {ITableHead} from './ITableHead';

export type Props<T> = {
    store: ITableHead<T>
}

export function BaseTableHead<T>(props: Props<T>): ReactElement {
  const {
    store,
  } =props;

  return (
    <Styled.TableHeadStyled>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <InputCheckBox
            color="primary"
            checked={store.selectedAll}
            onChange={store.handleSelectAll}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {store.heads.map((head) => {
          const field = store.sort.currentSortField;
          const isActive = field ? field.id === head.id : false;

          return (
            <TableCell
              key={head.id}
              sortDirection={isActive ? field.direction : false}
            >
              <Styled.TableSortLabelStyled
                active={isActive}
                direction={isActive ? field.direction : 'asc'}
                onClick={() => {
                  store.sort.setCurrentSortField(head);
                  field && field.toggleDirection();
                }}
              >
                {head.label}
                {isActive ? (
                  <Box
                    component="span"
                    sx={visuallyHidden}
                  >
                    {field.direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </Styled.TableSortLabelStyled>
            </TableCell>
          );
        })}
      </TableRow>
    </Styled.TableHeadStyled>
  );
};

export const TableHead = observer(BaseTableHead);
