import {
    RenderFunction, createElement
} from "@app/render-kit";
import FacadeSlot from "../facade-slot";
import { AppState } from "@app/core";
import { Stage, RuntimeSlot, connect, FrameStageProps, FrameStage } from '@app/game-mechanics';
import { selectStageChildren, selectFullStageData } from '../../../state';

type OwnProps = {
    stage: Stage;
};

export type EnhancedFrameStageProps = StoreProps & OwnProps;

type StoreProps = Partial<{
    slots: RuntimeSlot[];
    fullStage: Stage;
}>;

const EnhancedFrameStage: RenderFunction<EnhancedFrameStageProps> = (({ fullStage, slots }) => {
    return createElement<FrameStageProps>(FrameStage, { stage: fullStage, slots, childType: FacadeSlot });
});

const mapStateToProps = (state: AppState, ownProps: OwnProps): StoreProps => ({
    slots: selectStageChildren(ownProps.stage.id)(state),
    fullStage: selectFullStageData(ownProps.stage)(state),
});

export default connect(mapStateToProps)(EnhancedFrameStage);