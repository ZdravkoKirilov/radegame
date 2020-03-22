import { createElement, StatefulComponent, RzElementPrimitiveProps, DidUpdatePayload, } from "@app/render-kit";
import { AppState } from "@app/core";
import { ShapeSlotProps, ShapeSlot, RuntimeSlot, Style, connectToStore, RuntimeShape, combineStyles, RuntimeSlotHandler, ExpressionContext } from "@app/game-mechanics";
import { selectSlotStyle, selectRuntimeShape, selectSlotHandlers, selectExpressionContext } from '../../state';
import { assignHandlers } from "../../helpers";

export type EnhancedShapeSlotProps = {
    data: RuntimeSlot;
}

type StoreProps = {
    style: Style;
    shape: RuntimeShape;
    handlers: RuntimeSlotHandler[];
    context: ExpressionContext;
};

type Props = EnhancedShapeSlotProps & StoreProps;

export class EnhancedShapeSlot extends StatefulComponent<Props> {
    render() {
        const self = this;
        const { style, shape, handlers, context } = this.props;
        const composedStyle = combineStyles(shape, style);
        return createElement<RzElementPrimitiveProps>(
            'container',
            {...assignHandlers({
                self,
                dispatcher: null,
                handlers,
                context
            })},
            createElement<ShapeSlotProps>(ShapeSlot, { style: composedStyle, shape }),
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: EnhancedShapeSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data),
    shape: selectRuntimeShape(ownProps.data.shape)(state),
    handlers: selectSlotHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
});

export default connectToStore(mapStateToProps)(EnhancedShapeSlot);