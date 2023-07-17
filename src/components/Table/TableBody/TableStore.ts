
import autobind from 'autobind-decorator';
import {reaction} from 'mobx';
import {ITableStore, WithCheckedProperty} from './ITableStore';
import {PaginationTableStore} from '../Pagination';
import {TableHeadStore, ColumnHead} from '../TableHead';
import { ArrayStore } from 'stores/ArrayStore';
import { ISortStore } from '../Sort/ISortStore';
import { BackendPaginationStore } from 'stores/BackendPagination';


@autobind
export class TableStore<T> implements ITableStore<T> {
  public readonly head: TableHeadStore<T>;

  private readonly _list = new ArrayStore<WithCheckedProperty<T>>([]);

  private readonly _paginationTable: PaginationTableStore;

  constructor(
    private readonly _heads: Array<ColumnHead>,
    private readonly _sort: ISortStore<T>,
    private readonly _pagination: BackendPaginationStore,
  ) {
    this.head = new TableHeadStore<T>(
      this._heads,
      this._sort,
    );

    this._paginationTable = new PaginationTableStore(this._pagination);

    reaction(
      () => this.head.selectedAll,
      (check) => {
        if (check) {
          this._list.setItems([...this._list.items.map((item) => {
            return {...item, checked: true};
          })]);
        } else {
          this._list.setItems([...this._list.items.map((item) => {
            return {...item, checked: false};
          })]);
        }
      },
    );
  }

  public setList(list: Array<T>) {
    this._list.setItems(list);
  }

  public selectItem(itemSelected: T) {
    this._list.setItems([...this._list.items.map((item)=>{
      return itemSelected === item ? {...item, checked: !item.checked} : {...item};
    })]);
  }

  public get pagination(): PaginationTableStore {
    return this._paginationTable;
  }

  public get selectedItems(): T[] {
    return this._list.items.filter((item) => item.checked);
  }

  public get sort(): ISortStore<WithCheckedProperty<T>> {
    return this._sort;
  }

  public get sortList(): Array<WithCheckedProperty<T>> {
    return Array.isArray(this._list.items) ?
      this._sort.apply(this._list.items) : [];
  }

  public get list(): Array<WithCheckedProperty<T>> {
    return this._list.items;
  }
}
