import {BackendPaginationStoreOptions} from './BackendPaginationStoreOptions';

export interface IBackendPaginationStoreOptions {
  setOptions(options: Partial<BackendPaginationStoreOptions>): void;
  readonly empty: boolean;
  readonly first: boolean;
  readonly last: boolean;
  readonly number: number;
  readonly size: number;
  readonly totalPages: number;
  readonly numberOfElements: number;
  readonly totalElements: number;
  readonly firstElement: number;
}
