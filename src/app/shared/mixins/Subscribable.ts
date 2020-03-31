type Callback<T = any> = (value: T) => void;

type Constructor<T = {}> = new (...args: any[]) => T;

export interface GenericSubscription {
  unsubscribe(): void;
}

export interface SubscribableBase<T> {
  provideValueToSubscribers(): T;
}

export function WithSubscriptions<TBase extends Constructor, ValueType = any>(Base: TBase) {
  return class extends Base implements SubscribableBase<any> {
    handlers = new Set();

    subscribe = (callback: Callback<ValueType>) => {
      if (!this.handlers.has(callback)) {
        this.handlers.add(callback);
      }
  
      callback(this.provideValueToSubscribers());
  
      return {
        unsubscribe() {
          this.handlers.delete(callback);
        }
      };
    };

    provideValueToSubscribers = () => { throw new Error('getExpectedValue must be implemented.') };
  };
}
