import {ArrayStore} from '../../../stores/ArrayStore';
import {reaction} from 'mobx';
import autobind from 'autobind-decorator';
import {DisposableStore} from '../../../stores/Dispose';
import {IEnhancedTableStore, WithCheckedProperty} from './interface';
import {PaginationStore} from '../Pagination';
import {HeadCell, TableHeadStore} from '../Head';
import {SortStore} from '../Sort';

@autobind
export class EnhancedTableStore<T> implements IEnhancedTableStore<T> {
  public readonly head: TableHeadStore<T>;

  private readonly _rows = new ArrayStore<WithCheckedProperty<T>>([]);

  private readonly _paginator = new PaginationStore();

  private readonly _disposer = new DisposableStore();

  private readonly _sort = new SortStore<WithCheckedProperty<T>>();

  constructor(
    private readonly _headCell: Array<HeadCell<T>>,
  ) {
    this.head = new TableHeadStore(
      this._headCell,
      this._sort,
    );

    this._disposer.push(
      reaction(
        () => this._rows.items,
        (items) => {
          this._paginator.configPagination(items.length);
        },
      ),
      reaction(
        () => this.head.selectedAll,
        (check) => {
          if (check) {
            this._rows.setItems([...this._rows.items.map((item) => {
              return {...item, checked: true};
            })]);
          } else {
            this._rows.setItems([...this._rows.items.map((item) => {
              return {...item, checked: false};
            })]);
          }
        },
      ),
    );
  }

  public setList(list: Array<T>) {
    this._rows.setItems(list);
  }

  public selectItem(itemSelected: T) {
    this._rows.setItems([...this._rows.items.map((item)=>{
      return itemSelected === item ? {...item, checked: !item.checked} : {...item};
    })]);
  }

  public get showRows(): Array<WithCheckedProperty<T>> {
    const sortList = this._sort.stableSort(
      this._rows.items,
      this._sort.getComparator(
        this._sort.order,
        this._sort.orderBy,
      ));
    return sortList.slice(
      this._paginator.page * this._paginator.rowsPerPage,
      this._paginator.page * this._paginator.rowsPerPage + this._paginator.rowsPerPage,
    );
  }

  public get selectedItems(): Array<T> {
    return this._rows.items.filter((item) => item.checked);
  }

  public get rows(): Array<T> {
    return this._rows.items;
  }

  public get paginator(): PaginationStore {
    return this._paginator;
  }

  public async dispose(): Promise<void> {
    await this._disposer.dispose();
    await this._paginator.dispose();
  }
}
