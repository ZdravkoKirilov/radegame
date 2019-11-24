import { get } from 'lodash';
import {
    RenderFunction, createElement, DynamicSprite,
    CompositeType, Memo
} from "@app/render-kit";
import FacadeSlot from "../facade-slot";
import { AppState } from "@app/core";
import { connect } from '../../../hocs';
import { Stage, Slot } from '../../../entities';
import { selectStageChildren, selectFullStageData } from '@app/game-arena';

export type FrameStageProps = {
    stage: Stage;
    slots: Slot[];
    childType: CompositeType<{ data: Slot }>;
};

export const FrameStage = Memo<FrameStageProps>(({ stage, slots, childType }) => {

    slots = slots || [];
    const nodes = slots.map(slot => {
        return createElement('container', { styles: { x: slot.x, y: slot.y }, key: slot.id },
            createElement(childType, { data: slot }),
        );
    });

    return createElement('container', null,
        createElement(DynamicSprite, {
            image: get(stage, 'image.image'), styles: {
                x: 0,
                y: 0,
                width: stage.width,
                height: stage.height,
            }
        }),
        createElement('collection', {}, nodes),
    );
});

type OwnProps = {
    stage: Stage;
};

export type EnhancedFrameStageProps = StoreProps & OwnProps;

type StoreProps = Partial<{
    slots: Slot[];
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