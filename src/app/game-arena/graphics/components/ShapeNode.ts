import { createElement, StatefulComponent, RzElementPrimitiveProps, RzTransition, RzTransitionProps, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
    BasicShapeNodeProps, BasicShapeNode, RuntimeWidgetNode, connectToStore, RuntimeShape, combineStyles, RuntimeNodeHandler, ExpressionContext, RuntimeTransition, selectNodeStyleSync, AddedStoreProps, GiveAndUseContext, WithNodeLifecycles, RuntimeNodeLifecycle
} from "@app/game-mechanics";
import { Dictionary } from "@app/shared";

import {
    selectRuntimeShape, selectNodeHandlers, selectExpressionContext,
    selectNodeTransitions,
    selectNodeLifecycles
} from '../../state';
import { assignHandlers } from "../../helpers";

export type EnhancedShapeNodeProps = {
    data: RuntimeWidgetNode;
}

type StoreProps = {
    shape: RuntimeShape;
    handlers: RuntimeNodeHandler[];
    context: ExpressionContext;
    transitions: RuntimeTransition[];
    lifecycles: RuntimeNodeLifecycle[];
};

type Props = EnhancedShapeNodeProps & StoreProps & AddedStoreProps;

type State = { animated: Dictionary };
@GiveAndUseContext
@WithNodeLifecycles
export class EnhancedShapeNode extends StatefulComponent<Props, State> {
    state: State = { animated: {} };

    render() {
        const self = this;
        const { shape, handlers, context, transitions, data, dispatch } = this.props;
        const { animated } = this.state;
        const style = selectNodeStyleSync(data, self);
        const composedStyle = combineStyles(shape, style);
        const styleWithTransitionOverrides = { ...composedStyle, ...animated };

        return createElement<RzElementPrimitiveProps>(
            'container',
            {
                ...assignHandlers({ self, dispatch, handlers, context }),
                styles: { z_order: composedStyle.z_order, }
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
            createElement<BasicShapeNodeProps>(
                BasicShapeNode,
                { style: styleWithTransitionOverrides, shape }
            ),
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: EnhancedShapeNodeProps): StoreProps => ({
    shape: selectRuntimeShape(ownProps.data.shape)(state),
    handlers: selectNodeHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
    transitions: selectNodeTransitions(ownProps.data)(state),
    lifecycles: selectNodeLifecycles(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedShapeNode);