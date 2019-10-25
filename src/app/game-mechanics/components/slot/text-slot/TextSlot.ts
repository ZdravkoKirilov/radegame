import {
    createElement, Memo, RzAnimation, AnimatableProps, RzAnimationProps,
    RzTransition, TransitionProps
} from "@app/render-kit";
import { Style, Text, Slot, Animation, Transition } from "../../../entities";
import { AppState } from "@app/core";
import {
    selectSlotStyle, selectSlotAnimation,
    selectSlotTransitions, selectSlotText
} from "app/game-arena/state/selectors/game-state2";
import { connect } from "../../../hocs";

export type TextSlotProps = {
    style: Style;
    text: Text;
};

export const TextSlot = Memo<TextSlotProps>(({ style, text }) => {
    return createElement('text', {
        value: text.default_value,
        styles: {
            x: style.x || 0,
            y: style.y || 0,
        },
        textStyle: {
            fontSize: style.font_size || 18,
            stroke: style.stroke_color,
            fill: style.background_color,
        }
    });

}, ['style', 'text']);

export type EnhancedTextSlotProps = {
    data: Slot;
};

type StoreProps = {
    style: Style;
    text: Text;
    animation: Animation;
    transitions: Transition[];
};

const EnhancedTextSlot = Memo<EnhancedTextSlotProps & StoreProps>(({ text, style, animation, transitions }) => {

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
                    return createElement<TextSlotProps>(TextSlot, { text, style: composedStyle });
                }
            );
        }
    );
});

const mapStateToProps = (state: AppState, ownProps: EnhancedTextSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data.id)(state),
    animation: selectSlotAnimation(ownProps.data.id)(state),
    transitions: selectSlotTransitions(ownProps.data.id)(state),
    text: selectSlotText(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(EnhancedTextSlot);