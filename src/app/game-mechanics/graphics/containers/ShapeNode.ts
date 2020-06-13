import { createElement, RzElementPrimitiveProps, StatefulComponent, RzTransitionProps, RzTransition, } from "@app/render-kit";
import { Dictionary } from "@app/shared";

import { RuntimeWidgetNode, RuntimeNodeHandler, RuntimeTransition, RuntimeNodeLifecycle } from "../../entities";
import { ExpressionContext } from "../../models";
import { AddedStoreProps, connectToStore } from "../../hocs";
import { GiveAndUseContext, WithNodeLifecycles } from "../../mixins";
import { assignHandlers, selectNodeStyleSync, selectNodeHandlers, selectExpressionContext, selectNodeTransitions, selectNodeLifecycles, CommonGameStore, selectChildPropsSync } from '../../helpers';
import { RootShapeProps, RootShape } from "./RootShape";

export type EnhancedShapeNodeProps = {
    data: RuntimeWidgetNode;
    fromParent?: {};
}

type StoreProps = {
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
        const { handlers, context, transitions, data } = this.props;
        const { animated } = this.state;
        const style = selectNodeStyleSync(data, self);
        const childProps = selectChildPropsSync(data, self);
        const styleWithTransitionOverrides = { ...style, ...animated };

        return createElement<RzElementPrimitiveProps>(
            'container',
            {
                ...assignHandlers({ self, handlers, context }),
                styles: { z: style.z, },
                name: `ShapeNode_${data.name}`,
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
            createElement<RootShapeProps>(
                RootShape,
                {
                    shape: data.shape,
                    style: styleWithTransitionOverrides,
                    fromParent: childProps,
                }
            )
        );
    }
}

const mapStateToProps = (state: CommonGameStore, ownProps: EnhancedShapeNodeProps): StoreProps => ({
    handlers: selectNodeHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
    transitions: selectNodeTransitions(ownProps.data)(state),
    lifecycles: selectNodeLifecycles(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedShapeNode);