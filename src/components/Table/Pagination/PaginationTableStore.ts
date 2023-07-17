import autobind from 'autobind-decorator';
import {IPaginationTableStore} from './IPaginationTableStore';
import { BackendPaginationStore } from 'stores/BackendPagination';

@autobind
export class PaginationTableStore implements IPaginationTableStore {
  constructor(
        private readonly _pagination: BackendPaginationStore,
  ) {
  }

  public onChangePage(page: number) {
    this._pagination.setOptions({
      ...this._pagination,
      number: (page - 1),
    });
  }

  public onChangePageSize(size: number) {
    this._pagination.setOptions({
      ...this._pagination,
      size: size,
    });
  }

  public get pagination(): BackendPaginationStore {
    return this._pagination;
  }
}
