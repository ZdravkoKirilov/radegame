import { StatefulComponent } from "../../../bases";
import { RzElement } from "../../../models";

type Props = {
    value: any;
    children: RzElement;
};

export class ContextProvider extends StatefulComponent<Props, any> {

    shouldUpdate(nextProps: Props) {
        return nextProps.value !== this.props.value;
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