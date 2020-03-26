import { createElement, RzElementPrimitiveProps, StatefulComponent, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
    RuntimeSlot, Style, connectToStore, StageRendererProps, StageRenderer, RuntimeStage,
    combineStyles, ExpressionContext, selectStageSlotsSync, selectStageFrameSync, selectSlotStyleSync
} from "@app/game-mechanics";
import { selectRuntimeStage, selectExpressionContext } from '../../state';

import NodeFactory, { NodeFactoryProps } from './Factory';
import StaticStage, { StaticStageProps } from "./StaticStage";

export type EnhancedStageSlotProps = {
    data: RuntimeSlot;
}

type StoreProps = {
    stage: RuntimeStage;
    context: ExpressionContext;
};

type Props = EnhancedStageSlotProps & StoreProps;

class EnhancedStageSlot extends StatefulComponent<Props> {

    render() {
        const self = this;
        const { stage, context, data } = this.props;
        const slots = selectStageSlotsSync(stage, context, self);
        const frame = selectStageFrameSync(stage, context, self);
        const style = selectSlotStyleSync(data, self);

        return createElement<StageRendererProps>(StageRenderer, {
            stage, slots, style, frame,
            renderChild: (slot: RuntimeSlot) => {
                const composedStyle = combineStyles(slot, style);

                return createElement<RzElementPrimitiveProps>(
                    'container',
                    {
                        styles: { x: slot.x, y: slot.y, z_order: composedStyle.z_order },
                        id: slot.id,
                        name: `node_${slot.id}`
                    },
                    createElement<NodeFactoryProps>(NodeFactory, { data: slot })
                );
            },
            renderStaticStage: stage => createElement<StaticStageProps>(StaticStage, { stage, style }),
        });
    }
};

const mapStateToProps = (state: AppState, ownProps: EnhancedStageSlotProps): StoreProps => ({
    stage: selectRuntimeStage(ownProps.data.board)(state),
    context: selectExpressionContext(state),
});

export default connectToStore(mapStateToProps)(EnhancedStageSlot);