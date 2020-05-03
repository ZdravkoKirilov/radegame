import { StatefulComponent, findContextProvider } from "@app/render-kit";
import { SubscribableBase, GenericSubscription, WithSubscriptions } from "@app/shared";

import { RuntimeSlot } from "../entities";

type Constructor<T = {}> = new (...args: any[]) => T;
type Callback<T = any> = (value: T) => void;

type RequiredProps = {
  data: RuntimeSlot;
}

export function GiveAndUseContext(constructor: Constructor<StatefulComponent<RequiredProps>>) {
  const prototype = constructor.prototype;
  const originalDidMount = prototype.didMount;
  const originalWillUnmount = prototype.willUnmount;
  const originalDidUpdate = prototype.didUpdate;

  prototype.didMount = function () {
    const slot: RuntimeSlot = this.props.data;
    if (slot.consume_context) {
      const result: any[] = slot.consume_context({ slot, component: this });
      if (result.length) {
        this.subscriptions = new Set(result.map(contextName => {
          if (typeof contextName === 'string') {
            const targetContext: SubscribableBase = findContextProvider(this, contextName);
            const sub = targetContext ? targetContext.subscribe(newValue => this.setState({
              elem: newValue,
            })) : null;
            return sub;
          }
          return contextName;
        }).filter(Boolean));
      }
    }
    originalDidMount && originalDidMount.apply(this, arguments);
  };

  prototype.didUpdate = function () {
    const callbacks = this.callbacks || new Set();
    callbacks && callbacks.forEach((handler: Callback) => {
      handler(this.provideValueToSubscribers());
    });
    originalDidUpdate && originalDidUpdate.apply(this, arguments);
  };

  prototype.willUnmount = function () {
    this.subscriptions && this.subscriptions.forEach((sub: GenericSubscription) => sub.unsubscribe());
    originalWillUnmount && originalWillUnmount.apply(this, arguments);
  };

  prototype.provideValueToSubscribers = () => {
    const slot: RuntimeSlot = this.props.data;
    return slot.provide_context ? slot.provide_context({ slot, component: this }) : null;
  };

  return WithSubscriptions<any>(constructor) as typeof StatefulComponent;
}