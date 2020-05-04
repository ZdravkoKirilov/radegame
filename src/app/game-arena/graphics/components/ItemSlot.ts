import { createElement, RzElementPrimitiveProps, StatefulComponent, RzTransitionProps, RzTransition, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
  RuntimeSlot, connectToStore, StageRendererProps, StageRenderer, RuntimeStage,
  combineStyles, ExpressionContext, selectStageSlotsSync, selectStageFrameSync, selectSlotStyleSync, RuntimeSlotHandler, RuntimeTransition, AddedStoreProps, GiveAndUseContext, WithSlotLifecycles, RuntimeSlotLifecycle, selectChildPropsSync
} from "@app/game-mechanics";
import { Dictionary } from "@app/shared";

import { selectExpressionContext, selectItemTemplate, selectSlotHandlers, selectSlotTransitions, selectSlotLifecycles } from '../../state';
import NodeFactory, { NodeFactoryProps } from './Factory';
import StaticStage, { StaticStageProps } from "./StaticStage";
import { assignHandlers } from "../../helpers";

export type EnhancedItemSlotProps = {
  data: RuntimeSlot;
  fromParent: any;
}

type StoreProps = {
  stage: RuntimeStage;
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
    const { stage, context, data, handlers, transitions, dispatch } = this.props;
    const { animated } = this.state;
    const slots = selectStageSlotsSync(stage, context, self);
    const frame = selectStageFrameSync(stage, context, self);
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
      createElement<StageRendererProps>(StageRenderer, {
        stage, slots, style, frame,
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
        renderFrame: stage => createElement<StaticStageProps>(StaticStage, { stage, style, fromParent: childProps }),
      }),
    );
  }
};

const mapStateToProps = (state: AppState, ownProps: EnhancedItemSlotProps): StoreProps => ({
  stage: selectItemTemplate(ownProps.data.item)(state),
  handlers: selectSlotHandlers(ownProps.data)(state),
  context: selectExpressionContext(state),
  transitions: selectSlotTransitions(ownProps.data)(state),
  lifecycles: selectSlotLifecycles(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedItemSlot);