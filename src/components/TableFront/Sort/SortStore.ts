import autobind from 'autobind-decorator';
import { ISortStore, Order } from './interface';
import { ValueBoxStore } from 'stores/ValueBox';

@autobind
export class SortStore<T> implements ISortStore<T> {
  private readonly _order = new ValueBoxStore<Order>('asc');

  private readonly _orderBy = new ValueBoxStore<keyof T>(null);

  public handleRequestSort(property: keyof T) {
    const isAsc = this._orderBy.value === property && this._order.value === 'asc';
    this._order.set(isAsc ? 'desc' : 'asc');
    this._orderBy.set(property);
  };

  private normalizeValue(value: unknown) {
    if (typeof value === 'string') {
      return value.toString().toLowerCase();
    }
    return value;
  }

  public stableSort(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  public descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    const valueA = this.normalizeValue(a[orderBy]);
    const valueB = this.normalizeValue(b[orderBy]);

    if (valueB < valueA) {
      return -1;
    }
    if (valueB > valueA) {
      return 1;
    }
    return 0;
  }

  public getComparator(
    order: Order,
    orderBy: keyof T,
  ): (
    a,
    b,
  ) => number {
    return order === 'desc' ?
      (a, b) => this.descendingComparator(a, b, orderBy) :
      (a, b) => - this.descendingComparator(a, b, orderBy);
  }

  public get order(): Order {
    return this._order.value;
  }

  public get orderBy(): keyof T {
    return this._orderBy.value;
  }
}
