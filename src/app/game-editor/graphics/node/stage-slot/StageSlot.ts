import { get } from 'lodash';
import { RenderFunction, createElement } from "@app/render-kit";
import { Stage, StageRenderer, StageRendererProps, Style, RuntimeSlot } from "@app/game-mechanics";
import { AppState } from "@app/core";
import { connect } from "@app/game-mechanics";
import { selectSlotStage, selectSlotStageChildren, selectSlotStyle } from '../../../state';

import FacadeSlot from '../facade-slot';


type OwnProps = {
    data: RuntimeSlot;
};

export type EnhancedStageSlotProps = StoreProps & OwnProps;

type StoreProps = Partial<{
    stage: Stage;
    slots: RuntimeSlot[];
    style: Style;
}>;

const EnhancedStageSlot: RenderFunction<EnhancedStageSlotProps> = (({ stage, slots, style }) => {
    return createElement<StageRendererProps>(StageRenderer, { stage, slots, childType: FacadeSlot, style });
});

const mapStateToProps = (state: AppState, ownProps: OwnProps): StoreProps => ({
    stage: selectSlotStage(ownProps.data.id)(state),
    slots: selectSlotStageChildren(ownProps.data.id)(state),
    style: selectSlotStyle(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(EnhancedStageSlot);