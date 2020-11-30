import { WithSubscriptions, GenericSubscription, SubscribableBase, Callback } from "@app/shared";

import { StatefulComponent } from "../../../internal";

type Props<T = any> = {
  value: T;
};

export interface ContextSubscription extends GenericSubscription { };

@WithSubscriptions
export class ContextProvider<T = {}> extends StatefulComponent<Props<T>> implements SubscribableBase<T> {
  callbacks = new Set<Callback<T>>();

  provideValueToSubscribers() {
    return this.props.value;
  }

  shouldUpdate(nextProps: Props) {
    return nextProps.value !== this.props.value;
  }

  willReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.props.value) {
      this.callbacks.forEach((cb: (value: T) => void) => cb(nextProps.value));
    }
  }

  render() {
    return this.props.children!;
  }
}