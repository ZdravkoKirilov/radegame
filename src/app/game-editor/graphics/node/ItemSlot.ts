import { createElement, RzElementPrimitiveProps, StatefulComponent, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
  RuntimeSlot, connectToStore, StageRendererProps, StageRenderer, RuntimeStage,
  combineStyles, ExpressionContext, selectStageSlotsSync, selectStageFrameSync, selectSlotStyleSync
} from "@app/game-mechanics";
import { selectExpressionContext, selectItemTemplate } from '../../state';

import NodeFactory, { NodeFactoryProps } from './Factory';
import StaticStage, { StaticStageProps } from "./StaticStage";

export type EnhancedItemSlotProps = {
  data: RuntimeSlot;
}

type StoreProps = {
  stage: RuntimeStage;
  context: ExpressionContext;
};

type Props = EnhancedItemSlotProps & StoreProps;

class EnhancedItemSlot extends StatefulComponent<Props> {

  render() {
    const self = this;
    const { stage, context, data } = this.props;
    const slots = selectStageSlotsSync(stage, context, self);
    const frame = selectStageFrameSync(stage, context, self);
    const style = selectSlotStyleSync(data, self);
  
    return createElement<StageRendererProps>(StageRenderer, {
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
      renderFrame: stage => createElement<StaticStageProps>(StaticStage, { stage, style }),
    });
  }
};

const mapStateToProps = (state: AppState, ownProps: EnhancedItemSlotProps): StoreProps => ({
  stage: selectItemTemplate(ownProps.data.item)(state),
  context: selectExpressionContext(state),
});

export default connectToStore(mapStateToProps)(EnhancedItemSlot);