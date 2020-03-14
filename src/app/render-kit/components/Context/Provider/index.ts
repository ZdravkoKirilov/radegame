import { StatefulComponent } from "../../../bases";
import { RzElement } from "../../../models";

type Props<T = any> = {
    children?: RzElement;
    value: T;
};

type Callback<T = any> = (value: T) => void;

export interface ContextSubscription {
    unsubscribe(): void;
}

export class ContextProvider<T = {}> extends StatefulComponent<Props<T>> {

    subscribe = (callback: Callback<T>) => {
        if (!this.handlers.has(callback)) {
            this.handlers.add(callback);
        }
        callback(this.props.value);
        return {
            unsubscribe() {
                this.handlers.delete(callback);
            }
        }
    }

    private handlers: Set<(value: T) => void>

    shouldUpdate(nextProps: Props) {
        return nextProps.value !== this.props.value;
    }

    willReceiveProps(nextProps: Props) {
        if (nextProps.value !== this.props.value) {
            this.handlers.forEach(cb => cb(nextProps.value));
        }
    }

    render() {
        return this.props.children;
    }
}