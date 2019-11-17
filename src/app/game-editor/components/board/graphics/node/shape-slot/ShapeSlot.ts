import { createElement, RenderFunction, } from "@app/render-kit";
import { AppState } from "@app/core";
import { ShapeSlotProps, ShapeSlot, Slot, Style, connect, Shape } from "@app/game-mechanics";
import { selectSlotStyle, selectSlotShape } from '../../../../../state';

export type EnhancedShapeSlotProps = {
    data: Slot;
}

type StoreProps = {
    style: Style;
    shape: Shape;
};

const EnhancedShapeSlot: RenderFunction<EnhancedShapeSlotProps & StoreProps> = ({ style, shape }) => {
    const composedStyle = { ...style, ...shape.style, ...shape.style_inline };
    return createElement<ShapeSlotProps>(ShapeSlot, { style: composedStyle, shape });
};

const mapStateToProps = (state: AppState, ownProps: EnhancedShapeSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data.id)(state),
    shape: selectSlotShape(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(EnhancedShapeSlot);