import {computed} from 'mobx';
import autobind from 'autobind-decorator';
import {ValueBoxStore} from '../ValueBox';

export interface IVisibility {
  isVisible: boolean;
  isHidden: boolean;
}

@autobind
export class VisibilityStore implements IVisibility {
  private readonly _box: ValueBoxStore<boolean>;

  constructor(defaultValue = true) {
    this._box = new ValueBoxStore<boolean>(defaultValue);
  }

  public show(): void {
    this._box.set(true);
  }

  public hide(): void {
    this._box.set(false);
  }

  public toggle(): void {
    this._box.set(!this._box.value);
  }

  @computed
  public get isVisible(): boolean {
    return this._box.value;
  }

  @computed
  public get isHidden(): boolean {
    return !this._box.value;
  }
}
