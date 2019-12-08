import {
    createElement, Memo
} from "@app/render-kit";
import { AppState } from "@app/core";
import {
    selectSlotStyle, selectSlotText
} from '../../../../../state';
import { TextSlotProps, TextSlot, Text, Style, Slot, connect } from "@app/game-mechanics";

export type EnhancedTextSlotProps = {
    data: Slot;
};

type StoreProps = {
    style: Style;
    text: Text;
};

const EnhancedTextSlot = Memo<EnhancedTextSlotProps & StoreProps>(({ text, style, data }) => {
    return createElement<TextSlotProps>(TextSlot, { text: text.default_value, style, slot: data });
});

const mapStateToProps = (state: AppState, ownProps: EnhancedTextSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data.id)(state),
    text: selectSlotText(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(EnhancedTextSlot);