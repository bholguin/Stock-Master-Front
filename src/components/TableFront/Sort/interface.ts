export type Order = 'asc' | 'desc';

export interface ISortStore<T> {
   readonly order: Order
   readonly orderBy: keyof T
   getComparator: (order: Order, orderBy: keyof T) => (a: unknown, b: unknown) => number;
   stableSort: (array: T[], comparator: (a: T, b: T) => number) => T[];
   handleRequestSort: (property: keyof T) => void;
   descendingComparator: (a: T, b: T, orderBy: keyof T) => 0 | 1 | -1;
}
