import { createElement, StatefulComponent, RzElementPrimitiveProps, RzTransition, RzTransitionProps, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
    ShapeSlotProps, ShapeSlot, RuntimeSlot, connectToStore, RuntimeShape, combineStyles, RuntimeSlotHandler, ExpressionContext, RuntimeTransition, selectSlotStyleSync, AddedStoreProps, GiveAndUseContext, WithSlotLifecycles, RuntimeSlotLifecycle
} from "@app/game-mechanics";
import { Dictionary } from "@app/shared";

import {
    selectRuntimeShape, selectSlotHandlers, selectExpressionContext,
    selectSlotTransitions,
    selectSlotLifecycles
} from '../../state';
import { assignHandlers } from "../../helpers";

export type EnhancedShapeSlotProps = {
    data: RuntimeSlot;
}

type StoreProps = {
    shape: RuntimeShape;
    handlers: RuntimeSlotHandler[];
    context: ExpressionContext;
    transitions: RuntimeTransition[];
    lifecycles: RuntimeSlotLifecycle[];
};

type Props = EnhancedShapeSlotProps & StoreProps & AddedStoreProps;

type State = { animated: Dictionary };
@GiveAndUseContext
@WithSlotLifecycles
export class EnhancedShapeSlot extends StatefulComponent<Props, State> {
    state: State = { animated: {} };

    render() {
        const self = this;
        const { shape, handlers, context, transitions, data, dispatch } = this.props;
        const { animated } = this.state;
        const style = selectSlotStyleSync(data, self);
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
            createElement<ShapeSlotProps>(
                ShapeSlot,
                { style: styleWithTransitionOverrides, shape }
            ),
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: EnhancedShapeSlotProps): StoreProps => ({
    shape: selectRuntimeShape(ownProps.data.shape)(state),
    handlers: selectSlotHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
    transitions: selectSlotTransitions(ownProps.data)(state),
    lifecycles: selectSlotLifecycles(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedShapeSlot);