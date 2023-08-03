import TableRow from '@mui/material/TableRow';
import {ReactElement} from 'react';
import {observer} from 'mobx-react';
import {Styled} from './Header.styles';
import {TableHeadStore} from './Header.store';

  interface Props<T> {
    store: TableHeadStore<T>
  }

function BaseHeadTable<T>(props: Props<T>): ReactElement {
  const {store} = props;
  const createSortHandler = (property: keyof T) =>
    (event: React.MouseEvent<unknown>) => {
      store.sort.handleRequestSort(property);
    };

  return (
    <Styled.TableHeadStyled>
      <TableRow>
        {/* <Styled.TableCellStyled>
          <InputCheckBox
            color="primary"
            checked={store.selectedAll}
            onChange={store.handleSelectAll}
          />
        </Styled.TableCellStyled> */}
        {store.heads.map((headCell) => (
          <Styled.TableCellStyled
            key={headCell.label}
            align={headCell.align}
            sortDirection={store.sort.orderBy === headCell.id ? store.sort.order : false}
          >
            <Styled.TableSortLabelStyled
              active={store.sort.orderBy === headCell.id}
              direction={store.sort.orderBy === headCell.id ? store.sort.order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </Styled.TableSortLabelStyled>
          </Styled.TableCellStyled>
        ))}
      </TableRow>
    </Styled.TableHeadStyled>
  );
};

export const EnhancedTableHead = observer(BaseHeadTable);
