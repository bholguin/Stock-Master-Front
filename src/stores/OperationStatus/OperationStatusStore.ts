import autobind from 'autobind-decorator';
import {AxiosError} from 'axios';
import {FailedParams, OperationStatus} from './OperationStatus';
import {ValueBoxStore} from '../ValueBox';

@autobind
export class OperationStatusStore {
  private readonly _status = new ValueBoxStore<OperationStatus>(OperationStatus.Idle);

  private readonly _error = new ValueBoxStore<FailedParams>({
    current: false,
    error: null,
  });

  public get status(): OperationStatus {
    return this._status.value;
  }

  public get isIdle(): boolean {
    return this._status.value === OperationStatus.Idle;
  }

  public get isRunning(): boolean {
    return this._status.value === OperationStatus.Running;
  }

  public get isPaused(): boolean {
    return this._status.value === OperationStatus.Paused;
  }

  public get isDone(): boolean {
    return this._status.value === OperationStatus.Done;
  }

  public get isAborted(): boolean {
    return this._status.value === OperationStatus.Aborted;
  }

  public get isFailed(): FailedParams {
    return this._error.value;
  }

  public get isCompleted(): boolean {
    return [
      OperationStatus.Done,
      OperationStatus.Aborted,
      OperationStatus.Failed,
    ].includes(this._status.value);
  }

  public idle(): void {
    this._status.set(OperationStatus.Idle);
  }

  public start(): void {
    this._status.set(OperationStatus.Running);
  }

  public pause(): void {
    this._status.set(OperationStatus.Paused);
  }

  public done(): void {
    this._status.set(OperationStatus.Done);
  }

  public abort(): void {
    this._status.set(OperationStatus.Aborted);
  }

  public fail(e: AxiosError): void {
    this._status.set(OperationStatus.Failed);
    this._error.set({
      error: e,
      current: true,
    });
  }
}
