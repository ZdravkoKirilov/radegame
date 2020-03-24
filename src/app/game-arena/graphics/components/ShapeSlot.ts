import { createElement, StatefulComponent, RzElementPrimitiveProps, RzTransition, RzTransitionProps, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
    ShapeSlotProps, ShapeSlot, RuntimeSlot, Style, connectToStore, RuntimeShape, combineStyles, RuntimeSlotHandler, ExpressionContext, RuntimeTransition
} from "@app/game-mechanics";
import {
    selectSlotStyle, selectRuntimeShape, selectSlotHandlers, selectExpressionContext,
    selectSlotTransitions
} from '../../state';
import { assignHandlers } from "../../helpers";
import { Dictionary } from "@app/shared";

export type EnhancedShapeSlotProps = {
    data: RuntimeSlot;
}

type StoreProps = {
    style: Style;
    shape: RuntimeShape;
    handlers: RuntimeSlotHandler[];
    context: ExpressionContext;
    transitions: RuntimeTransition[];
};

type Props = EnhancedShapeSlotProps & StoreProps;

type State = { animated: Dictionary };

export class EnhancedShapeSlot extends StatefulComponent<Props, State> {
    state: State = { animated: {} };

    render() {
        const self = this;
        const { style, shape, handlers, context, transitions } = this.props;
        const { animated } = this.state;
        const composedStyle = combineStyles(shape, style);
        const styleWithTransitionOverrides = { ...composedStyle, ...animated };

        return createElement<RzElementPrimitiveProps>(
            'container',
            {
                ...assignHandlers({
                    self,
                    dispatcher: null,
                    handlers,
                    context
                })
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
                    onUpdate: (value: Dictionary) => this.setState({ animated: value })
                },
                createElement<ShapeSlotProps>(
                    ShapeSlot,
                    { style: styleWithTransitionOverrides, shape }
                ),
            )
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: EnhancedShapeSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data),
    shape: selectRuntimeShape(ownProps.data.shape)(state),
    handlers: selectSlotHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
    transitions: selectSlotTransitions(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedShapeSlot);