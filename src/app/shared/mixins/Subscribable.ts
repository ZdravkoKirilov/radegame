type Callback<T = any> = (value: T) => void;

type Constructor<T = {}> = new (...args: any[]) => T;

export interface GenericSubscription {
  unsubscribe(): void;
}

export interface SubscribableBase<T = any> {
  provideValueToSubscribers(): T;
  subscribe(callback: Callback<T>): GenericSubscription;
}

export function WithSubscriptions<TBase extends Constructor, ValueType = any>(Base: TBase) {
  return class extends Base implements SubscribableBase<any> {
    private callbacks = new Set();

    subscribe = (callback: Callback<ValueType>) => {
      const self = this;
      this.callbacks.add(callback);

      callback(this.provideValueToSubscribers());

      return {
        unsubscribe() {
          self.callbacks.delete(callback);
        }
      };
    };

    provideValueToSubscribers = () => { throw new Error('getExpectedValue must be implemented.') };
  };
}