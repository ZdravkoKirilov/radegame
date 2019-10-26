import {
    RenderFunction, createElement, Memo, RzAnimation,
    RzAnimationProps, RzTransition, AnimatableProps, TransitionProps
} from "@app/render-kit";
import { Style, Slot, Transition, Animation } from "../../../entities";
import { connect } from "../../../hocs";
import { AppState } from "@app/core";
import { selectSlotStyle, selectSlotAnimation, selectSlotTransitions } from "app/game-arena/state/selectors/game-state2";

export type ShapeSlotProps = {
    style: Style;
}

export const ShapeSlot: RenderFunction<ShapeSlotProps & StoreProps> = ({ style }) => {

    return createElement('rectangle', {
        styles: {
            stroke_thickness: style.stroke_thickness,
            stroke_color: style.stroke_color,
            background_color: style.background_color,
            x: style.x || 0,
            y: style.y || 0,
            width: Number(style.width) + 10,
            height: Number(style.height) + 35,
            border_radius: style.border_radius || 15,
        }
    });
};

type EnhancedShapeSlotProps = {
    data: Slot;
}

type StoreProps = {
    style: Style;
    animation: Animation;
    transitions: Transition[];
};

const EnhancedShapeSlot = Memo<EnhancedShapeSlotProps & StoreProps>(({ style, animation, transitions = [] } ) => {
    return createElement<RzAnimationProps>(
        RzAnimation,
        {
            config: animation,
            active: !!animation,
            context: {
                state: {},
                props: {},
            }
        },
        (animatedStyle: AnimatableProps | any) => {
            return createElement<TransitionProps>(
                RzTransition,
                { transitions, data: {}, context: {} as any },
                (transitionStyle: AnimatableProps | any) => {
                    const composedStyle: Style = { ...style, ...transitionStyle, ...animatedStyle };
                    return createElement<ShapeSlotProps>(ShapeSlot, { style: composedStyle });
                }
            );
        }
    );
});

const mapStateToProps = (state: AppState, ownProps: EnhancedShapeSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data.id)(state),
    animation: selectSlotAnimation(ownProps.data.id)(state),
    transitions: selectSlotTransitions(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(EnhancedShapeSlot);