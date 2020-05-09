import { createElement, RzElementPrimitiveProps, StatefulComponent, RzTransitionProps, RzTransition, } from "@app/render-kit";
import { Dictionary } from "@app/shared";

import { RuntimeWidgetNode, RuntimeNodeHandler, RuntimeTransition, RuntimeNodeLifecycle, RuntimeShape } from "../../entities";
import { ExpressionContext } from "../../models";
import { AddedStoreProps, connectToStore } from "../../hocs";
import { GiveAndUseContext, WithNodeLifecycles } from "../../mixins";
import { assignHandlers } from "../../helpers/event-handlers";
import { selectNodeStyleSync } from "../../helpers/reusable-selectors";
import { combineStyles } from "../../helpers/misc";
import { selectNodeHandlers, selectExpressionContext, selectNodeTransitions, selectNodeLifecycles, selectRuntimeShape, CommonGameStore } from "../../helpers/common-selectors";
import { BasicShapeNode, BasicShapeNodeProps } from "../presentational";

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

const mapStateToProps = (state: CommonGameStore, ownProps: EnhancedShapeNodeProps): StoreProps => ({
    shape: selectRuntimeShape(ownProps.data.shape)(state),
    handlers: selectNodeHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
    transitions: selectNodeTransitions(ownProps.data)(state),
    lifecycles: selectNodeLifecycles(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedShapeNode);