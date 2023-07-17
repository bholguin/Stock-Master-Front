import {action, computed, reaction} from 'mobx';
import autobind from 'autobind-decorator';
import {IBackendPaginationStoreOptions} from './IBackendPaginationStore';
import {ValueBoxStore} from '../ValueBox';
import type{BackendPaginationStoreOptions} from './BackendPaginationStoreOptions';
import { DisposableStore } from 'stores/Dispose';

@autobind
export class BackendPaginationStore implements IBackendPaginationStoreOptions {
  private readonly _disposer = new DisposableStore();

  private readonly _options = new ValueBoxStore<Partial<BackendPaginationStoreOptions>>({});

  constructor(
    options: BackendPaginationStoreOptions,
  ) {
    this._options.set(options);

    this._disposer.push(
      reaction(
        () => this._options.value.size,
        () => this.verifyPagesDisponibility(),
      ),
    );
  }

  @computed
  public get empty(): boolean {
    return this._options.value?.empty;
  }

  @computed
  public get first(): boolean {
    return this._options.value?.first;
  }

  @computed
  public get last(): boolean {
    return this._options.value?.last;
  }

  @computed
  public get number(): number {
    return this._options.value.number;
  }

  @computed
  public get firstElement(): number {
    return this.number === 0 ? this.number : this.size;
  }

  @computed
  public get numberOfElements(): number {
    return this._options.value?.numberOfElements;
  }

  @computed
  public get size(): number {
    return this._options.value?.size;
  }

  @computed
  public get totalElements(): number {
    return this._options.value?.totalElements;
  }

  @computed
  public get totalPages(): number {
    return this._options.value?.totalPages;
  }

  @computed
  public get sizeList(): Array<number> {
    return this._options.value.sizeList ?this._options.value.sizeList : [];
  }

  private calculePagesNumber(totalElements: number, size: number): number {
    const pages = (totalElements / size);
    if (Number.isInteger(pages)) {
      return pages - 1;
    } else {
      return Math.trunc(pages);
    }
  }

  private getSizeList(totalElements: number): Array<number> {
    const pages = this.calculePagesNumber(
      totalElements, 10,
    );
    const sizeList = [];
    for (let i = 0; i <= pages; i++ ) {
      sizeList.push(((i+1)*10));
    }
    return sizeList;
  }

  private verifyPagesDisponibility() {
    const possiblePagination = (this._options.value.totalElements / this._options.value.size);
    if (possiblePagination >= 1) {
      this._options.set({
        ...this._options.value,
        number: this.calculePagesNumber(
          this._options.value.totalElements, this._options.value.size,
        ),
      });
    } else {
      this._options.set({
        ...this._options.value,
        number: 0,
      });
    }
  }

  @action
  public setOptions(options: Partial<BackendPaginationStoreOptions>): void {
    this._options.set({
      ...this._options.value,
      ...options,
      sizeList: this.getSizeList(options.totalElements),
    });
  }

  public async dispose(): Promise<void> {
    await this._disposer.dispose();
  }
}
