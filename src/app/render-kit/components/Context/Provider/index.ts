import { WithSubscriptions, GenericSubscription, SubscribableBase } from "@app/shared";

import { StatefulComponent, RzElement } from "../../../internal";

type Props<T = any> = {
    children?: RzElement;
    value: T;
};

export interface ContextSubscription extends GenericSubscription { };

@WithSubscriptions
export class ContextProvider<T = {}> extends StatefulComponent<Props<T>> implements SubscribableBase<T> {

    provideValueToSubscribers() {
        return this.props.value;
    }

    shouldUpdate(nextProps: Props) {
        return nextProps.value !== this.props.value;
    }

    willReceiveProps(nextProps: Props) {
        if (nextProps.value !== this.props.value) {
            this['handlers'].forEach(cb => cb(nextProps.value));
        }
    }

    render() {
        return this.props.children;
    }
}