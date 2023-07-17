import {ReactElement, ReactNode} from 'react';
import {observer} from 'mobx-react';
import {Styled} from './Table.styles';
import {EnhancedTableStore} from './Table.store';
import {EnhancedTableHead} from '../Head';
import {Pagination} from '../Pagination';

type Props<T> = {
    store: EnhancedTableStore<T>
    children: ReactNode;
}

function BaseTable<T>(props: Props<T>): ReactElement {
  const {store, children} = props;

  return (
    <Styled.Container>
      <Styled.TableContainerStyled>
        <Styled.TableStyled>
          <EnhancedTableHead
            store={store.head}
          />
          <Styled.TableBodyStyled>
            {children}
          </Styled.TableBodyStyled>
        </Styled.TableStyled>
      </Styled.TableContainerStyled>
      <Pagination
        pagination={store.paginator}
      />
    </Styled.Container>
  );
};

export const EnhancedTable = observer(BaseTable);
