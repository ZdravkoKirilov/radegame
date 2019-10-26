import { createElement, RenderFunction, } from "@app/render-kit";
import { AppState } from "@app/core";
import { ShapeSlotProps, ShapeSlot, Slot, Style, connect } from "@app/game-mechanics";
import { selectSlotStyle } from '../../../../../../state';

export type EnhancedShapeSlotProps = {
    data: Slot;
}

type StoreProps = {
    style: Style;
};

const EnhancedShapeSlot: RenderFunction<EnhancedShapeSlotProps & StoreProps> = ({ style }) => {
    return style ? createElement<ShapeSlotProps>(ShapeSlot, { style }) : null;
};

const mapStateToProps = (state: AppState, ownProps: EnhancedShapeSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(EnhancedShapeSlot);