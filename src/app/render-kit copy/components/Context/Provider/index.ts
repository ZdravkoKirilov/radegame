import { WithSubscriptions, GenericSubscription, SubscribableBase } from "@app/shared";

import { CustomComponent } from "../../../internal";

type Props<T = any> = {
  value: T;
};

export interface ContextSubscription extends GenericSubscription { };

@WithSubscriptions
export class ContextProvider<T = {}> extends CustomComponent<Props<T>> implements SubscribableBase<T> {
  subscribe = null as any;
  handlers = null as any;

  provideValueToSubscribers() {
    return this.props.value;
  }

  shouldUpdate(nextProps: Props) {
    return nextProps.value !== this.props.value;
  }

  willReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.props.value) {
      this['handlers'].forEach((cb: (value: T) => void) => cb(nextProps.value));
    }
  }

  render() {
    return this.props.children!;
  }
}