import {PaginationTableStore} from '../Pagination';
import { ISortStore } from '../Sort/ISortStore';
import { ITableHead } from '../TableHead';

export type WithCheckedProperty<T> = T & {
    checked? : boolean;
}

export interface ITableStore<T>{
    readonly head: ITableHead<T>;
    readonly list: Array<WithCheckedProperty<T>>;
    readonly sort: ISortStore<WithCheckedProperty<T>>;
    readonly sortList: Array<WithCheckedProperty<T>>;
    readonly selectedItems: Array<T>;
    readonly pagination: PaginationTableStore;
    setList(list: Array<T>):void;
    selectItem(index: T): void;
}
