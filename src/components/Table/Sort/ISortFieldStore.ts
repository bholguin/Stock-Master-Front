import {SortDirection} from './SortDirection';

export type FieldType = 'string' | 'date' | 'number';

export interface ISortFieldStore<T> {
    readonly id: string;
    readonly direction: SortDirection;
    setDirection(value: string): void;
    toggleDirection(): void;
    apply(items: readonly T[]): T[];
}
