import {IDisposableHandler} from './IDisposableHandler';

export interface IDisposable {
  push(...handlers: IDisposableHandler[]): void;
  dispose(): Promise<void>;
}
