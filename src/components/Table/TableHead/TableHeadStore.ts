import autobind from 'autobind-decorator';
import {ChangeEvent} from 'react';
import {ColumnHead, ITableHead} from './ITableHead';
import { ISortStore } from '../Sort/ISortStore';
import { ValueBoxStore } from 'stores/ValueBox';

@autobind
export class TableHeadStore<T> implements ITableHead<T> {
  private readonly _selectedAll = new ValueBoxStore<boolean>(false);

  constructor(
        private readonly _heads: Array<ColumnHead>,
        private readonly _sort: ISortStore<T>,
  ) {
  }

  public handleSelectAll(event: ChangeEvent<HTMLInputElement>) {
    return this._selectedAll.set(
      event.target.checked,
    );
  }

  public get heads(): Array<ColumnHead> {
    return this._heads;
  }

  public get selectedAll(): boolean {
    return this._selectedAll.value;
  }

  public get sort(): ISortStore<T> {
    return this._sort;
  }
}
