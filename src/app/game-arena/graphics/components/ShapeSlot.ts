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

export class EnhancedShapeSlot extends StatefulComponent<Props> {
    render() {
        const self = this;
        const { style, shape, handlers, context, transitions } = this.props;
        const composedStyle = combineStyles(shape, style);

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
                    render: value => {
                        const styleWithTransitionOverrides = { ...composedStyle, ...value };
                        return createElement<ShapeSlotProps>(
                            ShapeSlot,
                            { style: styleWithTransitionOverrides, shape }
                        );
                    }
                },
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