type Callback<T = any> = (value: T) => void;

type Constructor<T = {}> = new (...args: any[]) => T;

export interface GenericSubscription {
  unsubscribe(): void;
}

export interface SubscribableBase<T> {
  provideValueToSubscribers(): T;
  subscribe?(callback: Callback<T>): GenericSubscription;
}

export function WithSubscriptions<TBase extends Constructor, ValueType = any>(Base: TBase) {
  return class extends Base implements SubscribableBase<any> {
    private handlers = new Set();

    subscribe = (callback: Callback<ValueType>) => {
      this.handlers.add(callback);

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
