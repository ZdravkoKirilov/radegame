import { createElement, RzElementPrimitiveProps, StatefulComponent, RzTransitionProps, RzTransition, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
  RuntimeSlot, connectToStore, WidgetRendererProps, WidgetRenderer, RuntimeWidget,
  combineStyles, ExpressionContext, selectWidgetSlotsSync, selectWidgetFrameSync, selectSlotStyleSync, RuntimeSlotHandler, RuntimeTransition, AddedStoreProps, GiveAndUseContext, WithSlotLifecycles, RuntimeSlotLifecycle, selectChildPropsSync
} from "@app/game-mechanics";
import { Dictionary } from "@app/shared";

import { selectExpressionContext, selectItemTemplate, selectSlotHandlers, selectSlotTransitions, selectSlotLifecycles } from '../../state';
import NodeFactory, { NodeFactoryProps } from './Factory';
import StaticWidget, { StaticWidgetProps } from "./StaticWidget";
import { assignHandlers } from "../../helpers";

export type EnhancedItemSlotProps = {
  data: RuntimeSlot;
  fromParent: any;
}

type StoreProps = {
  widget: RuntimeWidget;
  context: ExpressionContext;
  handlers: RuntimeSlotHandler[];
  transitions: RuntimeTransition[];
  lifecycles: RuntimeSlotLifecycle[];
};

type Props = EnhancedItemSlotProps & StoreProps & AddedStoreProps;

type State = { animated: Dictionary };
@GiveAndUseContext
@WithSlotLifecycles
class EnhancedItemSlot extends StatefulComponent<Props, State> {
  state: State = { animated: {} };

  render() {
    const self = this;
    const { widget, context, data, handlers, transitions, dispatch } = this.props;
    const { animated } = this.state;
    const slots = selectWidgetSlotsSync(widget, context, self);
    const frame = selectWidgetFrameSync(widget, context, self);
    const style = selectSlotStyleSync(data, self);
    const childProps = selectChildPropsSync(data, self);
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
        widget, slots, style, frame,
        renderChild: (slot: RuntimeSlot) => {
          const composedStyle = combineStyles(slot, style);

          return createElement<RzElementPrimitiveProps>(
            'container',
            {
              styles: { x: slot.x, y: slot.y, z_order: composedStyle.z_order },
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

const mapStateToProps = (state: AppState, ownProps: EnhancedItemSlotProps): StoreProps => ({
  widget: selectItemTemplate(ownProps.data.item)(state),
  handlers: selectSlotHandlers(ownProps.data)(state),
  context: selectExpressionContext(state),
  transitions: selectSlotTransitions(ownProps.data)(state),
  lifecycles: selectSlotLifecycles(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedItemSlot);