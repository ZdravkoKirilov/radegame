import { createElement, Memo } from "@app/render-kit";
import { AppState } from "@app/core";
import { selectSlotStyle, selectSlotText } from '../../state';
import { TextSlotProps, TextSlot, Style, RuntimeSlot, connectToStore, RuntimeText, combineStyles } from "@app/game-mechanics";

export type EnhancedTextSlotProps = {
    data: RuntimeSlot;
};

type StoreProps = {
    style: Style;
    text: RuntimeText;
};

const EnhancedTextSlot = Memo<EnhancedTextSlotProps & StoreProps>(({ text, style }) => {
    const composedStyle = combineStyles(text, style);
    return createElement<TextSlotProps>(TextSlot, { text: text.computed_value, style: composedStyle });
});

const mapStateToProps = (state: AppState, ownProps: EnhancedTextSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data),
    text: selectSlotText(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedTextSlot);