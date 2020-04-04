import { createElement, RzElementPrimitiveProps, StatefulComponent, RzTransitionProps, RzTransition, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
  RuntimeSlot, connectToStore, StageRendererProps, StageRenderer, RuntimeStage,
  combineStyles, ExpressionContext, selectStageSlotsSync, selectStageFrameSync, selectSlotStyleSync, RuntimeSlotHandler, RuntimeTransition
} from "@app/game-mechanics";
import { selectExpressionContext, selectItemTemplate, selectSlotHandlers, selectSlotTransitions } from '../../state';

import NodeFactory, { NodeFactoryProps } from './Factory';
import StaticStage, { StaticStageProps } from "./StaticStage";
import { assignHandlers } from "../../helpers";
import { Dictionary } from "@app/shared";

export type EnhancedItemSlotProps = {
  data: RuntimeSlot;
}

type StoreProps = {
  stage: RuntimeStage;
  context: ExpressionContext;
  handlers: RuntimeSlotHandler[];
  transitions: RuntimeTransition[];
};

type Props = EnhancedItemSlotProps & StoreProps;

type State = { animated: Dictionary };

class EnhancedItemSlot extends StatefulComponent<Props, State> {
  state: State = { animated: {} };

  render() {
    const self = this;
    const { stage, context, data, handlers, transitions } = this.props;
    const { animated } = this.state;
    const slots = selectStageSlotsSync(stage, context, self);
    const frame = selectStageFrameSync(stage, context, self);
    const style = selectSlotStyleSync(data, self);
    const styleWithTransitionOverrides = { ...style, ...animated };

    return createElement<RzElementPrimitiveProps>(
      'container',
      {
        ...assignHandlers({
          self,
          dispatcher: null,
          handlers,
          context
        }),
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
            createElement<NodeFactoryProps>(NodeFactory, { data: slot })
          );
        },
        renderStaticStage: stage => createElement<StaticStageProps>(StaticStage, { stage, style }),
      }),
    );
  }
};

const mapStateToProps = (state: AppState, ownProps: EnhancedItemSlotProps): StoreProps => ({
  stage: selectItemTemplate(ownProps.data.item)(state),
  handlers: selectSlotHandlers(ownProps.data)(state),
  context: selectExpressionContext(state),
  transitions: selectSlotTransitions(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedItemSlot);