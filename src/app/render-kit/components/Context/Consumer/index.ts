import {
  StatefulComponent, MetaProps, RzElement, ComponentConstructor, ContextSubscription, findContextProvider,
} from "../../../internal";

type RenderCallback<T> = (data: T) => RzElement;

type ContextConsumerProps<T = any> = {
  value: T;
  render: RenderCallback<T>;
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
    const providerContext = findContextProvider(this, this.props.parentName, this.key);
    if (providerContext) {
      providerContext.subscribe((newValue: T) => this.setState({ value: newValue }));
    }
  }

  willUnmount() {
    this.sub && this.sub.unsubscribe();
  }

  render() {
    return this.state.value ? this.props.render(this.state.value) : null;
  }
}
