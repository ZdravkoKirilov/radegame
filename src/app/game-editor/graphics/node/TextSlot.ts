import {
    createElement, Memo
} from "@app/render-kit";
import { AppState } from "@app/core";
import {
    selectSlotStyle, selectSlotText
} from '../../state';
import { TextSlotProps, TextSlot, Text, Style, RuntimeSlot, connect } from "@app/game-mechanics";

export type EnhancedTextSlotProps = {
    data: RuntimeSlot;
};

type StoreProps = {
    style: Style;
    text: Text;
};

const EnhancedTextSlot = Memo<EnhancedTextSlotProps & StoreProps>(({ text, style, data }) => {
    return createElement<TextSlotProps>(TextSlot, { text: text.default_value, style, slot: data });
});

const mapStateToProps = (state: AppState, ownProps: EnhancedTextSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data),
    text: selectSlotText(ownProps.data),
});

export default connect(mapStateToProps)(EnhancedTextSlot);