import { createElement, Memo, } from "@app/render-kit";
import { AppState } from "@app/core";
import { selectSlotStyle } from "app/game-arena/state/selectors/game-state2";
import { ShapeSlotProps, ShapeSlot, Slot, Style, connect } from "@app/game-mechanics";

export type EnhancedShapeSlotProps = {
    data: Slot;
}

type StoreProps = {
    style: Style;
};

const EnhancedShapeSlot = Memo<EnhancedShapeSlotProps & StoreProps>(({ style }) => {
    return createElement<ShapeSlotProps>(ShapeSlot, { style });
});

const mapStateToProps = (state: AppState, ownProps: EnhancedShapeSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(EnhancedShapeSlot);