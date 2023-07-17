export interface ITableFilterStore {
  apply(): void | Promise<void>;
}
