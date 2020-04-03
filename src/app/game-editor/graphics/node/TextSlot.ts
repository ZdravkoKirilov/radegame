import { createElement, StatefulComponent } from "@app/render-kit";
import { AppState } from "@app/core";
import { selectExpressionContext } from '../../state';
import {
    TextSlotProps, TextSlot, RuntimeSlot, connectToStore, combineStyles, selectSlotTextSync, ExpressionContext,
    selectSlotStyleSync
} from "@app/game-mechanics";

export type EnhancedTextSlotProps = {
    data: RuntimeSlot;
};

type StoreProps = {
    context: ExpressionContext;
};

type Props = EnhancedTextSlotProps & StoreProps;

class EnhancedTextSlot extends StatefulComponent<Props> {

    render() {
        const self = this;
        const { data, context } = this.props;

        const text = selectSlotTextSync(data, context, self);
        const slotStyle = selectSlotStyleSync(data, self);
        const composedStyle = combineStyles(text, slotStyle);
        return createElement<TextSlotProps>(TextSlot, { text: text.computed_value, style: composedStyle });
    }

};

const mapStateToProps = (state: AppState): StoreProps => ({
    context: selectExpressionContext(state),
});

export default connectToStore(mapStateToProps)(EnhancedTextSlot);