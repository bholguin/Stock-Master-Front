import autobind from 'autobind-decorator';
import {ObservableValueBox} from './ObservableValueBox';

@autobind
export class ValueBoxStore<T> {
  private readonly _box: ObservableValueBox<T>;

  constructor(
    private readonly _defaultValue: T,
  ) {
    this._box = new ObservableValueBox(this._defaultValue);
  }

  public set(value: T): void {
    this._box.setValue(value);
  }

  public reset(): void {
    this._box.resetValue();
  }

  public get value(): T {
    return this._box.value;
  }
}
