import {TableHeadStore} from '../Head';
import {PaginationStore} from '../Pagination';

export type WithCheckedProperty<T> = T & {
    checked? : boolean;
  }

export interface IEnhancedTableStore<T> {
  readonly showRows: Array<WithCheckedProperty<T>>
  readonly head: TableHeadStore<T>;
  readonly selectedItems: Array<T>;
  readonly rows: Array<T>;
  readonly paginator: PaginationStore;
  dispose: () => Promise<void>;
  setList:(list: Array<T>) => void;
  selectItem: (itemSelected: T) => void
}
