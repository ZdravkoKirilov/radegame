import { createElement, RenderFunction, } from "@app/render-kit";
import { AppState } from "@app/core";
import { ShapeSlotProps, ShapeSlot, RuntimeSlot, Style, connectToStore, RuntimeShape, combineStyles } from "@app/game-mechanics";
import { selectSlotStyle, selectRuntimeShape } from '../../state';

export type EnhancedShapeSlotProps = {
    data: RuntimeSlot;
}

type StoreProps = {
    style: Style;
    shape: RuntimeShape;
};

const EnhancedShapeSlot: RenderFunction<EnhancedShapeSlotProps & StoreProps> = ({ style, shape }) => {
    const composedStyle = combineStyles(shape, style);
    return createElement<ShapeSlotProps>(ShapeSlot, { style: composedStyle, shape });
};

const mapStateToProps = (state: AppState, ownProps: EnhancedShapeSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data),
    shape: selectRuntimeShape(ownProps.data.shape)(state),
});

export default connectToStore(mapStateToProps)(EnhancedShapeSlot);