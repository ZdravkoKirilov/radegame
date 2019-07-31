import { StatefulComponent } from "../../../bases";
import { RzElement } from "../../../models";

type Props = {
    children?: RzElement;
};

export class ContextProvider<T = {}> extends StatefulComponent<Props & { value: T }> {

    shouldUpdate(nextProps: Props & { value: T }) {
        return nextProps.value !== this.props.value;
    }

    willReceiveProps(nextProps: & { value: T }) {
        if (nextProps.value !== this.props.value) {
            this.updateContext(nextProps.value);
        }
    }

    didMount() {
        this.updateContext(this.props.value);
    }

    updateContext(value: T) {
        this.meta.context.set(this.constructor, value);
    }

    render() {
        return this.props.children;
    }
}