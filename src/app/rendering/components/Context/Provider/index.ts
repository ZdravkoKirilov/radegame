import { StatefulComponent } from "../../../mixins";
import { RzElement, Lifecycles, MetaProps } from "../../../models";

type Props = {
    value: any;
    key: string;
    children: RzElement;
};

export class ContextProvider extends StatefulComponent<Props, any> implements Lifecycles {

    constructor(props: Props, meta: MetaProps) {
        if (meta.context.get(props.key)) {
            throw new Error(`Context already exists: "${props.key}"`);
        }
        super(props, meta);
    }

    shouldUpdate(nextProps: Props) {
        return nextProps.value !== this.props.value || nextProps.children !== this.props.children;
    }

    willReceiveProps(nextProps: Props) {
        if (nextProps.value !== this.props.value) {
            this.meta.context.set(this.props.key, nextProps.value);
        }
    }

    render() {
        return this.props.children;
    }
}