import {IDisposableHandler} from './IDisposableHandler';
import {IDisposable} from './IDisposable';

export class DisposableStore implements IDisposable {
  private _handlers: IDisposableHandler[] = [];

  public push(...handlers: IDisposableHandler[]): void {
    this._handlers.push(...handlers);
  }

  public async dispose(): Promise<void> {
    await Promise.all(
      this._handlers.map((x) => x()),
    );
  }
}
