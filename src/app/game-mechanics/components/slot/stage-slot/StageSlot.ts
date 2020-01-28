import { get } from 'lodash';
import { RenderFunction, createElement, DynamicSprite, CompositeType, Memo, calculateScaling } from "@app/render-kit";
import FacadeSlot from "../facade-slot";
import { AppState } from "@app/core";
import { connect } from '../../../hocs';
import { selectSlotStage, selectSlotStageChildren, selectSlotStyle } from '@app/game-arena';
import { Style, Stage, RuntimeSlot, ImageAsset } from '../../../entities';

export type StageSlotProps = {
    stage: Stage;
    slots: RuntimeSlot[];
    childType: CompositeType<{ data: RuntimeSlot }>;
    style: Style;
};

export const StageSlot = Memo<StageSlotProps>(({ stage, slots, childType, style }) => {
    slots = slots || [];
    const nodes = slots.map(slot => {
        return createElement('container', { styles: { x: slot.x, y: slot.y }, key: slot.id },
            createElement(childType, { data: slot }),
        );
    });

    return createElement('container', {
        styles: {
            scale: calculateScaling(
                [Number(style.width), Number(style.height)],
                [Number(stage.width), Number(stage.height)]),
        }
    },
        createElement(DynamicSprite, {
            image: get(stage, 'image.image'),
            styles: {
                x: 0,
                y: 0,
                width: stage.width,
                height: stage.height,
                z_order: 2,
            },
        }),
        createElement('collection', { styles: { z_order: 1} }, nodes),
    );
});

type OwnProps = {
    data: RuntimeSlot;
};

export type EnhancedStageSlotProps = StoreProps & OwnProps;

type StoreProps = Partial<{
    stage: Stage;
    slots: RuntimeSlot[];
    image: ImageAsset;
    style: Style;
}>;

const EnhancedStageSlot: RenderFunction<EnhancedStageSlotProps> = (({ stage, slots, style }) => {
    return createElement<StageSlotProps>(StageSlot, { stage, slots, childType: FacadeSlot, style });
});

const mapStateToProps = (state: AppState, ownProps: OwnProps): StoreProps => ({
    stage: selectSlotStage(ownProps.data.id)(state),
    slots: selectSlotStageChildren(ownProps.data.id)(state),
    style: selectSlotStyle(ownProps.data),
});

export default connect(mapStateToProps)(EnhancedStageSlot);