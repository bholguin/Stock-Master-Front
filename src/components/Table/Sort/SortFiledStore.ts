import autobind from 'autobind-decorator';
import {SortDirection} from './SortDirection';
import {ISortFieldStore} from './ISortFieldStore';
import { ValueBoxStore } from 'stores/ValueBox';
import { ColumnHead } from '../TableHead';


type Comparator<T> = (a: T, b: T) => number;

@autobind
export class SortFieldStore<T> implements ISortFieldStore<T> {
  private readonly _direction = new ValueBoxStore<SortDirection>('asc');

  constructor(private readonly _head: ColumnHead) {}

  private descendingComparator(a: T, b: T) {
    const valueA = this.normalizeValue(a);
    const valueB = this.normalizeValue(b);

    if (valueA === null || valueA === '') return -1;
    if (valueB === null || valueB === '') return 1;
    if (valueA > valueB) {
      return -1;
    }

    if (valueA < valueB) {
      return 1;
    }

    return 0;
  }

  private normalizeValue(value: T): T {
    const isString = this._head.type === 'string';
    const orderBy = this._head.id;

    if (isString && value[orderBy]) {
      return value[orderBy].toString().toLowerCase();
    }

    return value[orderBy];
  }

  private getComparator(): Comparator<T> {
    return this._direction.value === 'desc' ?
      (a, b) => this.descendingComparator(a, b) :
      (a, b) => -this.descendingComparator(a, b);
  }

  private sort(items: readonly T[], comparator: Comparator<T>) {
    const sortedItems = items.map((el, index) => [el, index] as [T, number]);
    sortedItems.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });

    return sortedItems.map((el) => el[0]);
  }

  public apply(items: readonly T[]) {
    return this.sort(
      items,
      this.getComparator(),
    );
  }

  public toggleDirection() {
    const direction = this._direction.value === 'asc' ? 'desc' : 'asc';

    this._direction.set(direction);
  }

  public setDirection(direction: SortDirection) {
    this._direction.set(direction);
  }

  public get direction(): SortDirection {
    return this._direction.value;
  }

  public get id(): string {
    return this._head.id;
  }
}
