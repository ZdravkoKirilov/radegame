import { createElement, RenderFunction, } from "@app/render-kit";
import { AppState } from "@app/core";
import { RuntimeSlot, Style, connect, StageRendererProps, StageRenderer, RuntimeStage, RuntimeImageFrame } from "@app/game-mechanics";
import { selectSlotStyle, selectRuntimeStage, selectStageSlots, selectStageFrame } from '../../state';

import NodeFactory, { NodeFactoryProps } from './Factory';
import FrameAsStage, { FrameAsStageProps } from "./FrameAsStage";

export type EnhancedStageSlotProps = {
    data: RuntimeSlot;
}

type StoreProps = {
    style: Style;
    stage: RuntimeStage;
    slots: RuntimeSlot[];
    frame: RuntimeImageFrame;
};

const EnhancedStageSlot: RenderFunction<EnhancedStageSlotProps & StoreProps> = ({ style, stage, slots, frame }) => {

    return createElement<StageRendererProps>(StageRenderer, {
        stage, slots, style, frame,
        renderChild: (slot: RuntimeSlot) => createElement<NodeFactoryProps>(NodeFactory, { data: slot }),
        renderFrameAsStage: (stage: RuntimeStage) => createElement<FrameAsStageProps>(FrameAsStage, { stage }),
    });
};

const mapStateToProps = (state: AppState, ownProps: EnhancedStageSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data),
    stage: selectRuntimeStage(ownProps.data.board)(state),
    slots: selectStageSlots(ownProps.data.board)(state),
    frame: selectStageFrame(ownProps.data.board)(state),
});

export default connect(mapStateToProps)(EnhancedStageSlot);