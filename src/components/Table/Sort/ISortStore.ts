import {SortFieldStore} from './SortFiledStore';
import {ColumnHead} from '../TableHead';

export interface ISortStore<T> {
    readonly fields: Array<SortFieldStore<T>>;
    readonly currentSortField: SortFieldStore<T>;
    setCurrentSortField(head: ColumnHead): void;
    apply(array: readonly T[]): T[];
}
