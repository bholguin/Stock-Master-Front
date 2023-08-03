import {ChangeEvent} from 'react';
import {SortStore} from '../Sort';
import {WithCheckedProperty} from '../Table/interface';

export type Order = 'asc' | 'desc';

export interface HeadCell<T> {
    id: keyof T & {action?: unknown};
    label: string;
    align?: "center" | "left" | "right" | "justify" | "inherit"
  }

export interface ITableHeadStore<T>{
  readonly heads: Array<HeadCell<T>>;
  readonly selectedAll: boolean;
  readonly sort: SortStore<WithCheckedProperty<T>>;
  handleSelectAll: (event: ChangeEvent<HTMLInputElement>) => void
}
