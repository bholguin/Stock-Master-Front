
import autobind from 'autobind-decorator';
import {reaction} from 'mobx';
import {IPaginationStore} from './interface';
import { ValueBoxStore } from 'stores/ValueBox';
import { ArrayStore } from 'stores/ArrayStore';
import { DisposableStore } from 'stores/Dispose';

@autobind
export class PaginationStore implements IPaginationStore {
  private readonly _totalPages = new ValueBoxStore<number>(0);

  private readonly _page = new ValueBoxStore<number>(0);

  private readonly _rowsPerPage = new ValueBoxStore<number>(10);

  private readonly _sizeList = new ArrayStore<number>([]);

  private readonly _totalElements = new ValueBoxStore<number>(0);

  private readonly _disposer = new DisposableStore();

  constructor() {
    this._disposer.push(
      reaction(
        () => this._rowsPerPage.value,
        () => this.verifyPagesDisponibility(),
      ),
    );
  }

  public handleChangePage(newPage: number) {
    this._page.set(newPage);
  }

  public handleChangeRowsPerPage(rows: number) {
    this._rowsPerPage.set(rows);
  }

  private calculePagesNumber(totalElements: number, size: number): number {
    const pages = (totalElements / size);
    if (Number.isInteger(pages)) {
      return pages;
    } else {
      return Math.ceil(pages);
    }
  }

  public configPagination(totalElements: number) {
    const calculate = 10;
    const pages = this.calculePagesNumber(
      totalElements, calculate,
    );
    const sizeList = [];
    for (let i = 0; i <= pages; i++ ) {
      sizeList.push(((i+1)*calculate));
    }
    this._totalElements.set(totalElements);
    this._totalPages.set(pages);
    this._sizeList.setItems(sizeList);
  }

  private verifyPagesDisponibility() {
    const possiblePagination = (this._totalElements.value / this._rowsPerPage.value);
    if (possiblePagination >= 1) {
      const pages = this.calculePagesNumber(
        this._totalElements.value, this._rowsPerPage.value,
      );
      this._totalPages.set(pages);
    } else {
      this._totalPages.set(1);
      this._page.set(0);
    }
  }

  public get page(): number {
    return this._page.value;
  }

  public get rowsPerPage(): number {
    return this._rowsPerPage.value;
  }

  public get totalPages(): number {
    return this._totalPages.value;
  }

  public get sizeList(): Array<number> {
    return this._sizeList.items;
  }

  public async dispose(): Promise<void> {
    await this._disposer.dispose();
  }
}
