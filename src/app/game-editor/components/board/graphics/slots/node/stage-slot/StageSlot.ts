import { get } from 'lodash';
import { RenderFunction, createElement } from "@app/render-kit";
import { Stage, Slot, StageSlot, StageSlotProps } from "@app/game-mechanics";
import { AppState } from "@app/core";
import { connect } from "@app/game-mechanics";
import { selectSlotStage, selectSlotStageChildren } from '../../../../../../state';

import FacadeSlot from '../facade-slot';


type OwnProps = {
    data: Slot;
};

export type EnhancedStageSlotProps = StoreProps & OwnProps;

type StoreProps = Partial<{
    stage: Stage;
    slots: Slot[];
}>;

const EnhancedStageSlot: RenderFunction<EnhancedStageSlotProps> = (({ stage, slots }) => {
    return createElement<StageSlotProps>(StageSlot, { stage, slots, childType: FacadeSlot });
});

const mapStateToProps = (state: AppState, ownProps: OwnProps): StoreProps => ({
    stage: selectSlotStage(ownProps.data.id)(state),
    slots: selectSlotStageChildren(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(EnhancedStageSlot);