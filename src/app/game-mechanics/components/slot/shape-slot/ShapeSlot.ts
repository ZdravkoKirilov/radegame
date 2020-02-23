import {
    createElement, Memo, RzTransition, AnimatableProps, TransitionProps
} from "@app/render-kit";
import { Style, RuntimeSlot, RuntimeTransition, RuntimeShape } from "../../../entities";
import { connect } from "../../../hocs";
import { AppState } from "@app/core";
import {
    selectSlotStyle,
    selectSlotTransitions, selectSlotShape
} from "@app/game-arena";
import { ShapeSlotProps, ShapeSlot } from "../../presentationals/Shape";

type EnhancedShapeSlotProps = {
    data: RuntimeSlot;
}

type StoreProps = {
    style: Style;
    shape: RuntimeShape;
    transitions: RuntimeTransition[];
};

const EnhancedShapeSlot = Memo<EnhancedShapeSlotProps & StoreProps>(({ style, shape, transitions = [] }) => {

    return createElement<TransitionProps>(
        RzTransition,
        { transitions },
        (transitionStyle: AnimatableProps | any) => {
            const composedStyle: Style = { ...style, ...shape.style_inline, ...transitionStyle };
            return shape ?
                createElement<ShapeSlotProps>(ShapeSlot, { style: composedStyle, shape }) :
                null;
        }
    );
});

const mapStateToProps = (state: AppState, ownProps: EnhancedShapeSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data),
    shape: selectSlotShape(ownProps.data),
    transitions: selectSlotTransitions(ownProps.data),
});

export default connect(mapStateToProps)(EnhancedShapeSlot);