import {
    createElement, Memo,
} from "@app/render-kit";
import { Style, Text, Slot, Transition } from "../../../entities";
import { AppState } from "@app/core";
import {
    selectSlotStyle,
    selectSlotTransitions, selectSlotText
} from "@app/game-arena";
import { connect, withArenaTransition } from "../../../hocs";
import { Dictionary } from "@app/shared";

export type TextSlotProps = {
    style: Style;
    text: string;
    slot: Slot;
};

export const TextSlot = Memo<TextSlotProps>(({ style, text, slot }) => {
    style = style || {};
    text = text || 'Default value';
    return createElement('text', {
        value: text,
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
    interpolatedData: Dictionary;
}

const EnhancedTextSlot = Memo<EnhancedTextSlotProps & StoreProps & AnimationProps>(({ text, style, data, interpolatedData }) => {
    const composedStyle = { ...style } as Style;
    const composedText = interpolatedData.text || text.default_value;
    return createElement<TextSlotProps>(TextSlot, { text: composedText, style: composedStyle, slot: data });
});

const mapStateToProps = (state: AppState, ownProps: EnhancedTextSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data.id)(state),
    transitions: selectSlotTransitions(ownProps.data.id)(state),
    text: selectSlotText(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(withArenaTransition(EnhancedTextSlot));