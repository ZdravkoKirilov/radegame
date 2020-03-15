import {
    createElement, Memo,
} from "@app/render-kit";
import { AppState } from "@app/core";
import {
    selectSlotStyle,
    selectSlotTransitions, selectSlotText
} from "../../../../state";
import { Dictionary } from "@app/shared";
import { RuntimeSlot, Style, RuntimeTransition, TextSlotProps, TextSlot, connectToStore, Text } from "@app/game-mechanics";
import { withArenaTransition } from "../../../../hocs";

export type EnhancedTextSlotProps = {
    data: RuntimeSlot;
};

type StoreProps = {
    style: Style;
    text: Text;
    transitions: RuntimeTransition[];
};

type AnimationProps = {
    interpolatedData: Dictionary;
}

const EnhancedTextSlot = Memo<EnhancedTextSlotProps & StoreProps & AnimationProps>(({ text, style, interpolatedData }) => {
    const composedStyle = { ...style } as Style;
    const composedText = interpolatedData.text || text.default_value;
    return createElement<TextSlotProps>(TextSlot, { text: composedText, style: composedStyle });
});

const mapStateToProps = (state: AppState, ownProps: EnhancedTextSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data),
    transitions: selectSlotTransitions(ownProps.data),
    text: selectSlotText(ownProps.data.id)(state),
});

export default connectToStore(mapStateToProps)(withArenaTransition(EnhancedTextSlot));