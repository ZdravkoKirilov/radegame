import { createElement, RzElementPrimitiveProps, StatefulComponent, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
  connectToStore, Style, RuntimeSlot, Stage, StageRenderer, StageRendererProps, RuntimeStage, combineStyles,
  ExpressionContext, selectStageSlotsSync, selectStageFrameSync
} from "@app/game-mechanics";
import { selectRuntimeStage, selectExpressionContext } from "../../state";
import NodeFactory, { NodeFactoryProps } from "./Factory";

export type StaticStageProps = {
  stage: Stage;
  style: Style;
}

type StoreProps = {
  runtimeStage: RuntimeStage;
  context: ExpressionContext;
};

type Props = StaticStageProps & StoreProps;

class StaticStage extends StatefulComponent<Props>  {

  render() {
    const self = this;
    const { style, runtimeStage, context } = this.props;
    const slots = selectStageSlotsSync(runtimeStage, context, self);
    const frame = selectStageFrameSync(runtimeStage, context, self);

    return createElement<StageRendererProps>(StageRenderer, {
      stage: runtimeStage, slots, style, frame,
      renderChild: (slot: RuntimeSlot) => {
        const composedStyle = combineStyles(slot, style);

        return createElement<RzElementPrimitiveProps>(
          'container',
          {
            styles: { x: slot.x, y: slot.y, z_order: composedStyle.z_order },
            id: slot.id,
            name: `node_${slot.id}`
          },
          createElement<NodeFactoryProps>(NodeFactory, { data: slot }),
        );
      },
      renderStaticStage: stage => createElement<StaticStageProps>(StaticStage, { stage, style }),
    });
  }
};

const mapStateToProps = (state: AppState, ownProps: StaticStageProps): StoreProps => ({
  runtimeStage: selectRuntimeStage(ownProps.stage)(state),
  context: selectExpressionContext(state),
});

export default connectToStore(mapStateToProps)(StaticStage);