import { createElement, StatefulComponent, RzElementPrimitiveProps } from "@app/render-kit";
import { AppState } from "@app/core";
import { selectSlotHandlers, selectExpressionContext } from '../../state';
import {
    TextSlotProps, TextSlot, RuntimeSlot, connectToStore,
    combineStyles, RuntimeSlotHandler, ExpressionContext, selectSlotStyleSync, selectSlotTextSync
} from "@app/game-mechanics";
import { assignHandlers } from "../../helpers";

export type EnhancedTextSlotProps = {
    data: RuntimeSlot;
};

type StoreProps = {
    handlers: RuntimeSlotHandler[];
    context: ExpressionContext;
};

type Props = EnhancedTextSlotProps & StoreProps;

class EnhancedTextSlot extends StatefulComponent<Props> {
    render() {
        const self = this;
        const { data, handlers, context } = this.props;
        const text = selectSlotTextSync(data, context, self);
        const style = selectSlotStyleSync(data, self);
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
    handlers: selectSlotHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
});

export default connectToStore(mapStateToProps)(EnhancedTextSlot);