import { StatefulComponent } from "../../../bases";
import { MetaProps } from "../../../models";
import { ContextSubscription } from "../../../services";

type Props = {
    children?: any;
};

type State = {
    value?: any;
}

export class ContextConsumer extends StatefulComponent<Props, State> {

    sub: ContextSubscription;
    state: State = {};
    key: Function;

    constructor(props: Props, meta: MetaProps) {
        super(props, meta);
    }

    shouldUpdate(nextProps: Props, nextState: State) {
        return nextState.value !== this.state.value;
    }

    render() {
        return this.props.children(this.state.value);
    }

    didMount() {
        this.sub = this.meta.context.subscribe(this.key, value => {
            this.setState({ value });
        });
    }

    willUnmount() {
        this.sub.unsubscribe();
    }
}