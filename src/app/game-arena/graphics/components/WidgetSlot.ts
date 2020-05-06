import { createElement, RzElementPrimitiveProps, StatefulComponent, RzTransitionProps, RzTransition, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
    RuntimeSlot, connectToStore, WidgetRendererProps, WidgetRenderer, RuntimeWidget,
    RuntimeSlotHandler, ExpressionContext, selectSlotStyleSync, RuntimeTransition, selectWidgetFrameSync, selectWidgetSlotsSync, AddedStoreProps, GiveAndUseContext, WithSlotLifecycles, RuntimeSlotLifecycle, selectChildPropsSync
} from "@app/game-mechanics";
import {
    selectRuntimeWidget, selectSlotHandlers, selectExpressionContext,
    selectSlotTransitions,
    selectSlotLifecycles
} from '../../state';

import NodeFactory, { NodeFactoryProps } from './Factory';
import StaticWidget, { StaticWidgetProps } from "./StaticWidget";
import { assignHandlers } from "../../helpers";
import { Dictionary } from "@app/shared";

export type EnhancedWidgetSlotProps = {
    data: RuntimeSlot;
    fromParent: any;
}

type StoreProps = {
    widget: RuntimeWidget;
    handlers: RuntimeSlotHandler[];
    context: ExpressionContext;
    transitions: RuntimeTransition[];
    lifecycles: RuntimeSlotLifecycle[];
};

type Props = EnhancedWidgetSlotProps & StoreProps & AddedStoreProps;

type State = { animated: Dictionary };

@GiveAndUseContext
@WithSlotLifecycles
class EnhancedWidgetSlot extends StatefulComponent<Props, State> {
    state: State = { animated: {} };

    render() {
        const self = this;
        const { data, widget, handlers, context, transitions, dispatch } = this.props;
        const childProps = selectChildPropsSync(data, self);
        const { animated } = this.state;
        const style = selectSlotStyleSync(data, self);
        const frame = selectWidgetFrameSync(widget, context, self);
        const slots = selectWidgetSlotsSync(widget, context, self);
        const styleWithTransitionOverrides = { ...style, ...animated };

        return createElement<RzElementPrimitiveProps>(
            'container',
            {
                ...assignHandlers({ self, dispatch, handlers, context }),
                styles: { z_order: style.z_order }
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
            createElement<WidgetRendererProps>(WidgetRenderer, {
                widget, slots, style: styleWithTransitionOverrides, frame,
                renderChild: (slot: RuntimeSlot) => {
                    const childSlotStyle = selectSlotStyleSync(slot, {} as StatefulComponent);

                    return createElement<RzElementPrimitiveProps>(
                        'container',
                        {
                            styles: { x: slot.x, y: slot.y, z_order: childSlotStyle.z_order },
                            id: slot.id,
                            name: `node_${slot.id}`
                        },
                        createElement<NodeFactoryProps>(NodeFactory, { data: slot, fromParent: childProps })
                    );
                },
                renderFrame: widget => createElement<StaticWidgetProps>(StaticWidget, { widget, style, fromParent: childProps }),
            }),
        );
    }
};

const mapStateToProps = (state: AppState, ownProps: EnhancedWidgetSlotProps): StoreProps => ({
    widget: selectRuntimeWidget(ownProps.data.board)(state),
    handlers: selectSlotHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
    transitions: selectSlotTransitions(ownProps.data)(state),
    lifecycles: selectSlotLifecycles(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedWidgetSlot);