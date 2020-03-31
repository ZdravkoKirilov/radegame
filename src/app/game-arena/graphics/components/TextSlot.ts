import { createElement, StatefulComponent, RzElementPrimitiveProps, RzTransitionProps, RzTransition } from "@app/render-kit";
import { AppState } from "@app/core";
import { selectSlotHandlers, selectExpressionContext, selectSlotTransitions } from '../../state';
import {
    TextSlotProps, TextSlot, RuntimeSlot, connectToStore,
    combineStyles, RuntimeSlotHandler, ExpressionContext, selectSlotStyleSync, selectSlotTextSync, RuntimeTransition
} from "@app/game-mechanics";
import { assignHandlers } from "../../helpers";
import { WithSubscriptions, Dictionary } from "@app/shared";

export type EnhancedTextSlotProps = {
    data: RuntimeSlot;
};

type StoreProps = {
    handlers: RuntimeSlotHandler[];
    context: ExpressionContext;
    transitions: RuntimeTransition[];
};

type Props = EnhancedTextSlotProps & StoreProps;

type State = { animated: Dictionary };

@WithSubscriptions
class EnhancedTextSlot extends StatefulComponent<Props, State> {
    state: State = { animated: {} };

    render() {
        const self = this;
        const { data, handlers, context, transitions } = this.props;
        const { animated } = this.state;
        const text = selectSlotTextSync(data, context, self);
        const style = selectSlotStyleSync(data, self);
        const composedStyle = combineStyles(text, style);
        const styleWithTransitionOverrides = { ...composedStyle, ...animated };

        return createElement<RzElementPrimitiveProps>(
            'container',
            {
                ...assignHandlers({
                    self,
                    dispatcher: null,
                    handlers,
                    context
                }),
                styles: { z_order: composedStyle.z_order }
            },
            createElement<RzTransitionProps>(
                RzTransition,
                {
                    transitions,
                    context: {
                        component: self,
                        props: this.props,
                        state: this.state,
                    },
                    onUpdate: (value: Dictionary) => this.setState({ animated: value }),
                    onDone: transition => {
                        if (transition.onDone) {
                            transition.onDone({
                                component: self,
                                transition,
                                styles: styleWithTransitionOverrides,
                            });
                        }
                    }
                },
            ),
            createElement<TextSlotProps>(TextSlot, { text: text.computed_value, style: styleWithTransitionOverrides }),
        );
    }
};

const mapStateToProps = (state: AppState, ownProps: EnhancedTextSlotProps): StoreProps => ({
    handlers: selectSlotHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
    transitions: selectSlotTransitions(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedTextSlot);