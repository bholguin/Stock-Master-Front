import autobind from 'autobind-decorator';
import {ObservableArray} from './ObservableArray';

@autobind
export class ArrayStore<T> {
  // Use separate store to set observable value as a private property
  private readonly _store: ObservableArray<T>;

  constructor(
    private readonly _defaultValue: T[] = [],
  ) {
    this._store = new ObservableArray(_defaultValue);
  }

  public get items(): T[] {
    return this._store.items;
  }

  public get total(): number {
    return this._store.items.length;
  }

  public setItems(items: T[]): void {
    this._store.setItems(items);
  }

  public add(item: T): void {
    this._store.add(item);
  }

  public reset(): void {
    this.setItems(this._defaultValue);
  }
}
