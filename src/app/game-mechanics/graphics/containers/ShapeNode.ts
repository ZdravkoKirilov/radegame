import { createElement, RzElementPrimitiveProps, StatefulComponent } from "@app/render-kit";
import { Dictionary } from "@app/shared";

import { RuntimeWidgetNode, RuntimeNodeHandler, RuntimeNodeLifecycle, Style } from "../../entities";
import { ExpressionContext } from "../../models";
import { AddedStoreProps, connectToStore } from "../../hocs";
import { GiveAndUseContext, WithNodeLifecycles } from "../../mixins";
import { assignHandlers, selectNodeHandlers, selectExpressionContext, selectNodeLifecycles, CommonGameStore } from '../../helpers';
import { RootShapeProps, RootShape } from "./RootShape";

export type EnhancedShapeNodeProps = {
    data: RuntimeWidgetNode;
    fromParent?: {};
}

type StoreProps = {
    handlers: RuntimeNodeHandler[];
    context: ExpressionContext;
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
        const { handlers, context, data } = this.props;
        const { animated } = this.state;
        const style = {} as any; // selectNodeStyleSync(data, self);
        const childProps = {} as any; //selectChildPropsSync(data, self);
        const styleWithTransitionOverrides = { ...style, ...animated } as Style;

        return createElement<RzElementPrimitiveProps>(
            'container',
            {
                ...assignHandlers({ self, handlers, context }),
                styles: { z: style.z, },
                name: `ShapeNode_${data.name}`,
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
            createElement<RootShapeProps>(
                RootShape,
                {
                    shape: data.shape,
                    style: styleWithTransitionOverrides,
                    fromParent: childProps,
                }
            ) as any
        );
    }
}

const mapStateToProps = (state: CommonGameStore, ownProps: EnhancedShapeNodeProps): StoreProps => ({
    handlers: selectNodeHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
    lifecycles: selectNodeLifecycles(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedShapeNode as any);