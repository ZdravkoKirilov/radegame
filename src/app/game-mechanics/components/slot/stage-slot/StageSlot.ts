import { get } from 'lodash';
import { RenderFunction, createElement, DynamicSprite, CompositeType, Memo } from "@app/render-kit";
import { Stage, Slot, ImageAsset } from "@app/game-mechanics";
import FacadeSlot from "../facade-slot";
import { AppState } from "@app/core";
import { connect } from "app/game-mechanics/hocs";
import { selectSlotStage, selectSlotStageChildren } from '@app/game-arena';

export type StageSlotProps = {
    stage: Stage;
    slots: Slot[];
    childType: CompositeType<{ data: Slot }>
};

export const StageSlot = Memo<StageSlotProps>(({ stage, slots, childType }) => {
    slots = slots || [];
    const nodes = slots.map(slot => {
        return createElement('container', { styles: { x: slot.x, y: slot.y }, key: slot.id },
            createElement(childType, { data: slot }),
        );
    });

    return createElement('fragment', {},
        stage ? createElement(DynamicSprite, {
            image: get(stage, 'image.image'), styles: {
                x: 5,
                y: 5,
                width: stage.width,
                height: stage.height,
            }
        }) : null,
        createElement('collection', {}, nodes),
    );
});

type OwnProps = {
    data: Slot;
};

export type EnhancedStageSlotProps = StoreProps & OwnProps;

type StoreProps = Partial<{
    stage: Stage;
    slots: Slot[];
    image: ImageAsset;
}>;

const EnhancedStageSlot: RenderFunction<EnhancedStageSlotProps> = (({ stage, slots }) => {
    return createElement<StageSlotProps>(StageSlot, { stage, slots, childType: FacadeSlot });
});

const mapStateToProps = (state: AppState, ownProps: OwnProps): StoreProps => ({
    stage: selectSlotStage(ownProps.data.id)(state),
    slots: selectSlotStageChildren(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(EnhancedStageSlot);