import { createElement, StatefulComponent, RzElementPrimitiveProps, RzTransitionProps, RzTransition } from "@app/render-kit";
import { AppState } from "@app/core";
import {
    TextSlotProps, TextSlot, RuntimeSlot, connectToStore,
    combineStyles, RuntimeSlotHandler, ExpressionContext, selectSlotStyleSync, selectSlotTextSync, RuntimeTransition, AddedStoreProps, GiveAndUseContext, WithSlotLifecycles, RuntimeSlotLifecycle
} from "@app/game-mechanics";
import { Dictionary } from "@app/shared";

import { selectSlotHandlers, selectExpressionContext, selectSlotTransitions, selectSlotLifecycles } from '../../state';
import { assignHandlers } from "../../helpers";

export type EnhancedTextSlotProps = {
    data: RuntimeSlot;
};

type StoreProps = {
    handlers: RuntimeSlotHandler[];
    context: ExpressionContext;
    transitions: RuntimeTransition[];
    lifecycles: RuntimeSlotLifecycle[];
};

type Props = EnhancedTextSlotProps & StoreProps & AddedStoreProps;

type State = { animated: Dictionary };

@WithSlotLifecycles
@GiveAndUseContext
class EnhancedTextSlot extends StatefulComponent<Props, State> {
    state: State = { animated: {} };

    render() {
        const self = this;
        const { data, handlers, context, transitions, dispatch } = this.props;
        const { animated } = this.state;
        const text = selectSlotTextSync(data, context, self);
        const style = selectSlotStyleSync(data, self);
        const composedStyle = combineStyles(text, style);
        const styleWithTransitionOverrides = { ...composedStyle, ...animated };

        return createElement<RzElementPrimitiveProps>(
            'container',
            {
                ...assignHandlers({ self, dispatch, handlers, context }),
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
    lifecycles: selectSlotLifecycles(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedTextSlot);