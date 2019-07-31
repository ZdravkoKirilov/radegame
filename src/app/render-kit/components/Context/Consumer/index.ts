import { StatefulComponent } from "../../../bases";
import { MetaProps, RzElement } from "../../../models";
import { ContextSubscription } from "../../../services";

type RenderCallback<T> = (data: T) => RzElement;

export class ContextConsumer<T> extends StatefulComponent<{ value?: T, render?: RenderCallback<T> }> {

    sub: ContextSubscription;
    state: { value: T } = {} as any;
    key: Function;

    constructor(props: { value?: T, render?: RenderCallback<T> }, meta: MetaProps) {
        super(props, meta);
    }

    shouldRerender(nextProps: { value?: T, render?: RenderCallback<T> }, nextState: { value: T }) {
        return true;
    }

    render() {
        return this.state.value ? this.props.render(this.state.value) : null;
    }

    didMount() {
        this.sub = this.meta.context.subscribe(this.key, (value: T) => {
            this.setState({ value });
        });
    }

    willUnmount() {
        this.sub.unsubscribe();
    }
}