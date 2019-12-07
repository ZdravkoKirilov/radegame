import {
    createElement, Memo, AnimatableProps,
} from "@app/render-kit";
import { Style, Text, Slot, Transition } from "../../../entities";
import { AppState } from "@app/core";
import {
    selectSlotStyle,
    selectSlotTransitions, selectSlotText
} from "@app/game-arena";
import { connect, withArenaTransition } from "../../../hocs";

export type TextSlotProps = {
    style: Style;
    text: Text;
    slot: Slot;
};

export const TextSlot = Memo<TextSlotProps>(({ style, text, slot }) => {
    style = style || {};
    text = text || {};
    return createElement('text', {
        value: text.default_value || 'Default value',
        textStyle: {
            fontSize: style.font_size || 18,
            stroke: style.stroke_color || '#1a1b1c',
            fill: style.background_color || '#1a1b1c',
        }
    });

}, ['style', 'text']);

export type EnhancedTextSlotProps = {
    data: Slot;
};

type StoreProps = {
    style: Style;
    text: Text;
    transitions: Transition[];
};

type AnimationProps = {
    interpolatedStyle: AnimatableProps;
}

const EnhancedTextSlot = Memo<EnhancedTextSlotProps & StoreProps & AnimationProps>(({ text, style, data, interpolatedStyle }) => {
    const composedStyle = { ...style, ...interpolatedStyle } as Style;
    return createElement<TextSlotProps>(TextSlot, { text, style: composedStyle, slot: data });
});

const mapStateToProps = (state: AppState, ownProps: EnhancedTextSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data.id)(state),
    transitions: selectSlotTransitions(ownProps.data.id)(state),
    text: selectSlotText(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(withArenaTransition(EnhancedTextSlot));