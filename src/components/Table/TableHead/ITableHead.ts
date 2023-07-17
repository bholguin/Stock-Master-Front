import {ChangeEvent} from 'react';
import {FieldType} from '../Sort';
import { ISortStore } from '../Sort/ISortStore';

export interface ColumnHead {
    id: string;
    label: string;
    type: FieldType;
}

export interface ITableHead<T> {
    sort: ISortStore<T>;
    heads: Array<ColumnHead>;
    selectedAll: boolean;
    handleSelectAll(event: ChangeEvent<HTMLInputElement>): void;
}
