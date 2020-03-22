import { createElement, RenderFunction, RzElementPrimitiveProps, } from "@app/render-kit";
import { AppState } from "@app/core";
import { connectToStore, Style, RuntimeSlot, Stage, StageRenderer, StageRendererProps, RuntimeStage, RuntimeImageFrame, combineStyles } from "@app/game-mechanics";
import { selectStageSlots, selectRuntimeStage, selectStageFrame } from "../../state";
import NodeFactory, { NodeFactoryProps } from "./Factory";

export type StaticStageProps = {
  stage: Stage;
  style: Style;
}

type StoreProps = {
  slots: RuntimeSlot[];
  runtimeStage: RuntimeStage;
  frame: RuntimeImageFrame;
};

const StaticStage: RenderFunction<StaticStageProps & StoreProps> = ({ style, slots, runtimeStage, frame }) => {

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
};

const mapStateToProps = (state: AppState, ownProps: StaticStageProps): StoreProps => ({
  slots: selectStageSlots(ownProps.stage)(state),
  runtimeStage: selectRuntimeStage(ownProps.stage)(state),
  frame: selectStageFrame(ownProps.stage)(state),
});

export default connectToStore(mapStateToProps)(StaticStage);