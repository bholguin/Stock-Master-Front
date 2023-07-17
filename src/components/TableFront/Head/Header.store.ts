import autobind from 'autobind-decorator';
import {ChangeEvent} from 'react';
import {HeadCell, ITableHeadStore} from './interfaces';
import {SortStore} from '../Sort';
import {WithCheckedProperty} from '../Table';
import { ValueBoxStore } from 'stores/ValueBox';

@autobind
export class TableHeadStore<T> implements ITableHeadStore<T> {
  private readonly _selectedAll = new ValueBoxStore<boolean>(false);

  constructor(
    private readonly _heads: Array<HeadCell<T>>,
    private readonly _sort: SortStore<WithCheckedProperty<T>>,
  ) {
  }

  public handleSelectAll(event: ChangeEvent<HTMLInputElement>) {
    return this._selectedAll.set(
      event.target.checked,
    );
  }

  public get heads(): Array<HeadCell<T>> {
    return this._heads;
  }

  public get selectedAll(): boolean {
    return this._selectedAll.value;
  }

  public get sort(): SortStore<WithCheckedProperty<T>> {
    return this._sort;
  }
}
