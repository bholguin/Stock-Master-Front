import autobind from 'autobind-decorator';
import { ISortStore } from './ISortStore';
import { SortFieldStore } from './SortFiledStore';
import { ValueBoxStore } from 'stores/ValueBox';
import { ColumnHead } from '../TableHead';

@autobind
export class SortStore<T> implements ISortStore<T> {
  private readonly _fields: Array<SortFieldStore<T>>;

  private readonly _sortField = new ValueBoxStore<SortFieldStore<T>>(null);

  constructor(fields: Array<ColumnHead>) {
    this._fields = fields.map(
      (x) => new SortFieldStore(x),
    );
  }

  public get fields(): Array<SortFieldStore<T>> {
    return this._fields;
  }

  public get currentSortField(): SortFieldStore<T> {
    return this._sortField.value;
  }

  public apply(items: T[]): T[] {
    const field = this._sortField.value;
    if (!field) {
      return items;
    }
    return field.apply(items);
  }

  public setCurrentSortField(head: ColumnHead): void {
    this._sortField.set(
      this._fields.find((item) => item.id === head.id),
    );
  }
}
