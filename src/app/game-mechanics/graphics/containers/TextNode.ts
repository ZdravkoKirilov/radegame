import { createElement, RzElementPrimitiveProps, StatefulComponent } from "@app/render-kit";
import { Dictionary } from "@app/shared";

import { RuntimeWidgetNode, RuntimeNodeHandler, RuntimeNodeLifecycle } from "../../entities";
import { ExpressionContext } from "../../models";
import { AddedStoreProps, connectToStore } from "../../hocs";
import { GiveAndUseContext, WithNodeLifecycles } from "../../mixins";
import { assignHandlers } from "../../helpers/event-handlers";
import { selectNodeHandlers, CommonGameStore, selectExpressionContext, selectNodeLifecycles } from "../../helpers";
import { RootText, RootTextProps } from "./RootText";

export type EnhancedTextNodeProps = {
    data: RuntimeWidgetNode;
    fromParent: {};
};

type StoreProps = {
    handlers: RuntimeNodeHandler[];
    context: ExpressionContext;
    lifecycles: RuntimeNodeLifecycle[];
};

type Props = EnhancedTextNodeProps & StoreProps & AddedStoreProps;

type State = { animated: Dictionary };

@WithNodeLifecycles
@GiveAndUseContext
class EnhancedTextNode extends StatefulComponent<Props, State> {
    state: State = { animated: {} };

    render() {
        const self = this;
        const { data, handlers, context } = this.props;
        const { animated } = this.state;
        const text = {} as any //selectNodeTextSync(data, context, self);
        const childProps = {} as any //selectChildPropsSync(data, self);
        const style = {} as any // selectNodeStyleSync(data, self);
        const styleWithTransitionOverrides = { ...style, ...animated };

        return createElement<RzElementPrimitiveProps>(
            'container',
            {
                ...assignHandlers({ self, handlers, context }),
                styles: { z: style.z },
                name: `TextNode_${data.name}`,
            },
           /*  createElement<RzTransitionProps>(
                RzTransition,
                {
                    transitions,
                    context: {
                        component: self,
                        props: this.props,
                        state: this.state,
                    },
                    onUpdate: (value: Dictionary) => this.setState({ animated: value }),
                    onDone: transition => {
                        if (transition.onDone) {
                            transition.onDone({
                                component: self,
                                transition,
                                styles: styleWithTransitionOverrides,
                            });
                        }
                    }
                },
            ), */
            createElement<RootTextProps>(
                RootText,
                {
                    text,
                    style: styleWithTransitionOverrides as any,
                    fromParent: childProps,
                }
            ) as any
        );
    }
};

const mapStateToProps = (state: CommonGameStore, ownProps: EnhancedTextNodeProps): StoreProps => ({
    handlers: selectNodeHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
    lifecycles: selectNodeLifecycles(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedTextNode as any);