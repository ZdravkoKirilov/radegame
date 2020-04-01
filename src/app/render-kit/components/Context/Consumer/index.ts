import { StatefulComponent } from "../../../bases";
import { MetaProps, RzElement, ComponentConstructor, RzElementType } from "../../../models";
import { ContextSubscription, ContextProvider } from "../Provider";
import { Dictionary } from "@app/shared";
import { findInAncestors } from "../../../helpers";

type RenderCallback<T> = (data: T) => RzElement;

type ContextConsumerProps<T = any> = {
    value?: T;
    render?: RenderCallback<T>;
    parentName?: string;
}

type State<T = any> = { value: T };

export class ContextConsumer<T = any> extends StatefulComponent<ContextConsumerProps<T>> {

    state: State = {} as State;
    key: ComponentConstructor;
    sub: ContextSubscription;

    constructor(props: ContextConsumerProps<T>, meta: MetaProps) {
        super(props, meta);
    }

    shouldRerender() {
        return true;
    }

    didMount() {
        let matcher: Dictionary | RzElementType;
        if (this.props.parentName) {
            matcher = { name: this.props.parentName };
        } else {
            matcher = this.key;
        }
        const providerContext = findInAncestors<typeof ContextProvider.prototype>(this)(matcher);
        if (providerContext) {
            providerContext.subscribe(newValue => this.setState({ value: newValue }));
        }
    }

    willUnmount() {
        this.sub && this.sub.unsubscribe();
    }

    render() {
        return this.state.value ? this.props.render(this.state.value) : null;
    }
}
