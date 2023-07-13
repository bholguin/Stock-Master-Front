import {action, makeObservable, observable} from 'mobx';

/**
 * The reasons to create the class:
 *
 * 1. Encapsulation
 * - Items property can't be private and observable value.
 * - We can use this class and create a private observable value.
 *
 * 2. Mobx isolation
 * - We hide all mobx decorators and logic here and not exposing it outside.
 */
export class ObservableValueBox<T> {
  @observable
  public value: T;

  constructor(
    private readonly _defaultValue: T,
  ) {
    makeObservable(this);

    this.value = _defaultValue;
  }

  @action
  public setValue(value: T): void {
    this.value = value;
  };

  @action
  public resetValue(): void {
    this.value = this._defaultValue;
  };
}
