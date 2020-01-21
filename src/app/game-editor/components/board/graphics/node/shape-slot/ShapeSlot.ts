import { createElement, RenderFunction, } from "@app/render-kit";
import { AppState } from "@app/core";
import { ShapeSlotProps, ShapeSlot, RuntimeSlot, Style, connect } from "@app/game-mechanics";
import { selectSlotStyle } from '../../../../../state';

export type EnhancedShapeSlotProps = {
    data: RuntimeSlot;
}

type StoreProps = {
    style: Style;
};

const EnhancedShapeSlot: RenderFunction<EnhancedShapeSlotProps & StoreProps> = ({ style, data }) => {
    const shape = data.shape;
    const composedStyle = { ...style, ...shape.style_inline, interactive: true };
    return createElement<ShapeSlotProps>(ShapeSlot, { style: composedStyle, shape });
};

const mapStateToProps = (state: AppState, ownProps: EnhancedShapeSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(EnhancedShapeSlot);