import { StatefulComponent } from "../../../mixins";
import { RzElement, Lifecycles } from "../../../models";

type Props = {
    value: any;
    children: RzElement;
};

export class ContextProvider extends StatefulComponent<Props, any> implements Lifecycles {

    shouldUpdate(nextProps: Props) {
        return true;
    }

    willReceiveProps(nextProps: Props) {
        if (nextProps.value !== this.props.value) {
            this.updateContext(nextProps.value);
        }
    }

    updateContext(value: any) {
        this.meta.context.set(this.constructor, value);
    }

    render() {
        return this.props.children;
    }
}