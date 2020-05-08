import { createElement, StatefulComponent, RzElementPrimitiveProps, RzTransitionProps, RzTransition } from "@app/render-kit";
import { AppState } from "@app/core";
import {
    BasicTextNodeProps, BasicTextNode, RuntimeWidgetNode, connectToStore,
    combineStyles, RuntimeNodeHandler, ExpressionContext, selectNodeStyleSync, selectNodeTextSync, RuntimeTransition, AddedStoreProps, GiveAndUseContext, WithNodeLifecycles, RuntimeNodeLifecycle
} from "@app/game-mechanics";
import { Dictionary } from "@app/shared";

import { selectNodeHandlers, selectExpressionContext, selectNodeTransitions, selectNodeLifecycles } from '../../state';
import { assignHandlers } from "../../helpers";

export type EnhancedTextNodeProps = {
    data: RuntimeWidgetNode;
};

type StoreProps = {
    handlers: RuntimeNodeHandler[];
    context: ExpressionContext;
    transitions: RuntimeTransition[];
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
        const { data, handlers, context, transitions, dispatch } = this.props;
        const { animated } = this.state;
        const text = selectNodeTextSync(data, context, self);
        const style = selectNodeStyleSync(data, self);
        const composedStyle = combineStyles(text, style);
        const styleWithTransitionOverrides = { ...composedStyle, ...animated };

        return createElement<RzElementPrimitiveProps>(
            'container',
            {
                ...assignHandlers({ self, dispatch, handlers, context }),
                styles: { z_order: composedStyle.z_order }
            },
            createElement<RzTransitionProps>(
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
            ),
            createElement<BasicTextNodeProps>(BasicTextNode, { text: text.computed_value, style: styleWithTransitionOverrides }),
        );
    }
};

const mapStateToProps = (state: AppState, ownProps: EnhancedTextNodeProps): StoreProps => ({
    handlers: selectNodeHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
    transitions: selectNodeTransitions(ownProps.data)(state),
    lifecycles: selectNodeLifecycles(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedTextNode);