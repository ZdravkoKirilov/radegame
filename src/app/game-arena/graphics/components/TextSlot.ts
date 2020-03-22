import { createElement, Memo, StatefulComponent, RzElementPrimitiveProps } from "@app/render-kit";
import { AppState } from "@app/core";
import { selectSlotStyle, selectSlotText, selectSlotHandlers, selectExpressionContext } from '../../state';
import {
    TextSlotProps, TextSlot, Style, RuntimeSlot, connectToStore, RuntimeText,
    combineStyles, RuntimeSlotHandler, ExpressionContext
} from "@app/game-mechanics";
import { assignHandlers } from "../../helpers";

export type EnhancedTextSlotProps = {
    data: RuntimeSlot;
};

type StoreProps = {
    style: Style;
    text: RuntimeText;
    handlers: RuntimeSlotHandler[];
    context: ExpressionContext;
};

type Props = EnhancedTextSlotProps & StoreProps;

class EnhancedTextSlot extends StatefulComponent<Props> {
    render() {
        const self = this;
        const { text, style, handlers, context } = this.props;
        const composedStyle = combineStyles(text, style);

        return createElement<RzElementPrimitiveProps>(
            'container',
            {
                ...assignHandlers({
                    self,
                    dispatcher: null,
                    handlers,
                    context
                })
            },
            createElement<TextSlotProps>(TextSlot, { text: text.computed_value, style: composedStyle }),
        );
    }
};

const mapStateToProps = (state: AppState, ownProps: EnhancedTextSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data),
    text: selectSlotText(ownProps.data)(state),
    handlers: selectSlotHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
});

export default connectToStore(mapStateToProps)(EnhancedTextSlot);