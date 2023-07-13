import {computed} from 'mobx';
import autobind from 'autobind-decorator';
import {AxiosError} from 'axios';
import {OperationStatusStore} from '../OperationStatus';

export interface IAsyncOperationStore<TParams, TResult> {
    status: OperationStatusStore;
    run(params: TParams): Promise<TResult>;
}

export type AsyncOperationCallbackType<TParams, TResult> = (params: TParams) => Promise<TResult>;

@autobind
export class AsyncOperationStore<TParams, TResult = void> implements IAsyncOperationStore<TParams, TResult> {
  private readonly _status = new OperationStatusStore();

  constructor(
        private readonly _operationCallback: AsyncOperationCallbackType<TParams, TResult>,
  ) {
  }

  public async run(params?: TParams): Promise<TResult> {
    try {
      this._status.start();
      const result = await this._operationCallback(params);
      this._status.done();
      return result;
    } catch (e) {
      if (e instanceof AxiosError) {
        this._status.fail(e);
      }
      return Promise.reject(e);
    } finally {
      this._status.idle();
    }
  }

  @computed
  public get status(): OperationStatusStore {
    return this._status;
  }
}
