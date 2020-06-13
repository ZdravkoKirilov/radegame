import { StatefulComponent, findContextProvider } from "@app/render-kit";
import { SubscribableBase, GenericSubscription, WithSubscriptions } from "@app/shared";

import { RuntimeWidgetNode } from "../entities";

type Constructor<T = {}> = new (...args: any[]) => T;
type Callback<T = any> = (value: T) => void;

type RequiredProps = {
  data: RuntimeWidgetNode;
}

export function GiveAndUseContext(constructor: Constructor<StatefulComponent<RequiredProps>>) {
  const prototype = constructor.prototype;
  const originalDidMount = prototype.didMount;
  const originalWillUnmount = prototype.willUnmount;
  const originalDidUpdate = prototype.didUpdate;

  prototype.didMount = function () {
    const node: RuntimeWidgetNode = this.props.data;
    if (node.consume_context) {
      const result: Array<string | GenericSubscription> = node.consume_context({ node: node, component: this });
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
    const node: RuntimeWidgetNode = this.props.data;
    return node.provide_context ? node.provide_context({ node: node, component: this }) : null;
  };

  return WithSubscriptions<any>(constructor) as typeof StatefulComponent;
}