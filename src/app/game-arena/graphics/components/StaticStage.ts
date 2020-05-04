import { createElement, RzElementPrimitiveProps, StatefulComponent, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
  connectToStore, Style, RuntimeSlot, Stage, StageRenderer, StageRendererProps, RuntimeStage,
  selectStageFrameSync, selectStageSlotsSync, ExpressionContext,
} from "@app/game-mechanics";
import { selectRuntimeStage, selectExpressionContext } from "../../state";
import NodeFactory, { NodeFactoryProps } from "./Factory";

export type StaticStageProps = {
  stage: Stage;
  style: Style;
  fromParent?: any;
}

type StoreProps = {
  runtimeStage: RuntimeStage;
  context: ExpressionContext;
};

type Props = StaticStageProps & StoreProps;

export class StaticStage extends StatefulComponent<Props> {

  render() {
    const self = this;
    const { runtimeStage, context, style, fromParent } = this.props;

    const frame = selectStageFrameSync(runtimeStage, context, self);
    const slots = selectStageSlotsSync(runtimeStage, context, self);

    return createElement<StageRendererProps>(StageRenderer, {
      stage: runtimeStage, slots, style, frame,
      renderChild: (slot: RuntimeSlot) => {

        return createElement<RzElementPrimitiveProps>(
          'container',
          {
            styles: { x: slot.x, y: slot.y },
            id: slot.id,
            name: `node_${slot.id}`
          },
          createElement<NodeFactoryProps>(NodeFactory, { data: slot, fromParent }),
        );
      },
      renderFrame: stage => createElement<StaticStageProps>(StaticStage, { stage, style, fromParent }),
    });
  }
};

const mapStateToProps = (state: AppState, ownProps: StaticStageProps): StoreProps => ({
  runtimeStage: selectRuntimeStage(ownProps.stage)(state),
  context: selectExpressionContext(state),
});

export default connectToStore(mapStateToProps)(StaticStage);