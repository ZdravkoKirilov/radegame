import { createElement, RzElementPrimitiveProps, StatefulComponent, RzTransitionProps, RzTransition, } from "@app/render-kit";
import { Dictionary } from "@app/shared";

import { RuntimeWidgetNode, RuntimeNodeHandler, RuntimeTransition, RuntimeNodeLifecycle } from "../../entities";
import { ExpressionContext } from "../../models";
import { AddedStoreProps, connectToStore } from "../../hocs";
import { GiveAndUseContext, WithNodeLifecycles } from "../../mixins";
import {
    selectNodeHandlers, CommonGameStore, selectExpressionContext, selectNodeTransitions, selectNodeLifecycles, selectNodeStyleSync, selectChildPropsSync, assignHandlers
} from "../../helpers";
import { RootWidgetProps, RootWidget } from "./RootWidget";

export type EnhancedWidgetNodeProps = {
    data: RuntimeWidgetNode;
    fromParent: any;
}

type StoreProps = {
    context: ExpressionContext;

    handlers: RuntimeNodeHandler[];
    transitions: RuntimeTransition[];
    lifecycles: RuntimeNodeLifecycle[];
};

type Props = EnhancedWidgetNodeProps & StoreProps & AddedStoreProps;

type State = { animated: Dictionary };

@GiveAndUseContext
@WithNodeLifecycles
class EnhancedWidgetNode extends StatefulComponent<Props, State> {
    state: State = { animated: {} };

    render() {
        const self = this;
        const { data, handlers, context, transitions, dispatch } = this.props;
        const { animated } = this.state;
        const childProps = selectChildPropsSync(data, self);
        const style = selectNodeStyleSync(data, self);
        const styleWithTransitionOverrides = { ...style, ...animated };

        return createElement<RzElementPrimitiveProps>(
            'container',
            {
                ...assignHandlers({ self, dispatch, handlers, context }),
                styles: { z_order: style.z_order }
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
            createElement<RootWidgetProps>(
                RootWidget,
                {
                    widget: data.board,
                    fromParent: childProps,
                    style: styleWithTransitionOverrides,
                }
            )
        );
    }
};

const mapStateToProps = (state: CommonGameStore, ownProps: EnhancedWidgetNodeProps): StoreProps => ({
    context: selectExpressionContext(state),

    handlers: selectNodeHandlers(ownProps.data)(state),
    transitions: selectNodeTransitions(ownProps.data)(state),
    lifecycles: selectNodeLifecycles(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedWidgetNode);