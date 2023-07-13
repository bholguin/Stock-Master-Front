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
export class ObservableArray<T> {
  @observable
  public items: T[];

  constructor(defaultValue: T[] = []) {
    makeObservable(this);
    this.items = defaultValue;
  }

  @action
  public setItems(items: T[]): void {
    this.items = items;
  }

  @action
  public add(item: T): void {
    this.items.push(item);
  }
}
