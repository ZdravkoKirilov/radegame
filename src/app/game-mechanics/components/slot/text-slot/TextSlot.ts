import {
    createElement, Memo,
} from "@app/render-kit";
import { Style, Text, RuntimeSlot, RuntimeTransition } from "../../../entities";
import { AppState } from "@app/core";
import {
    selectSlotStyle,
    selectSlotTransitions, selectSlotText
} from "@app/game-arena";
import { connect, withArenaTransition } from "../../../hocs";
import { Dictionary } from "@app/shared";
import { TextSlotProps, TextSlot } from "../../presentationals";

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

const EnhancedTextSlot = Memo<EnhancedTextSlotProps & StoreProps & AnimationProps>(({ text, style, data, interpolatedData }) => {
    const composedStyle = { ...style } as Style;
    const composedText = interpolatedData.text || text.default_value;
    return createElement<TextSlotProps>(TextSlot, { text: composedText, style: composedStyle, slot: data });
});

const mapStateToProps = (state: AppState, ownProps: EnhancedTextSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data),
    transitions: selectSlotTransitions(ownProps.data),
    text: selectSlotText(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(withArenaTransition(EnhancedTextSlot));