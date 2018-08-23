import { StatefulComponent } from "../../../mixins";
import { Lifecycles, RenderFunction, MetaProps } from "../../../models";
import { ContextSubscription } from "../../../services";

type Props = {
    key: string;
    render: RenderFunction<any>;
};

type State = {
    value?: any;
}

export class ContextConsumer extends StatefulComponent<Props, State> implements Lifecycles {

    sub: ContextSubscription;
    state: State = {};

    constructor(props: Props, meta: MetaProps) {
        super(props, meta);

        this.sub = this.meta.context.subscribe(props.key, value => {
            this.setState({ value });
        });
    }

    shouldUpdate(nextProps: Props, nextState: State) {
        return nextState.value !== this.state.value || nextProps.render !== this.props.render;
    }

    render() {
        return this.props.render(this.state.value);
    }

    willUnmount() {
        this.sub.unsubscribe();
    }
}