import { createElement, RenderFunction, RzElementPrimitiveProps, StatefulComponent, } from "@app/render-kit";
import { AppState } from "@app/core";
import { RuntimeSlot, Style, connectToStore, StageRendererProps, StageRenderer, RuntimeStage, RuntimeImageFrame, combineStyles, RuntimeSlotHandler, ExpressionContext } from "@app/game-mechanics";
import { selectSlotStyle, selectRuntimeStage, selectStageSlots, selectStageFrame, selectSlotHandlers, selectExpressionContext } from '../../state';

import NodeFactory, { NodeFactoryProps } from './Factory';
import StaticStage, { StaticStageProps } from "./StaticStage";
import { assignHandlers } from "../../helpers";;

export type EnhancedStageSlotProps = {
    data: RuntimeSlot;
}

type StoreProps = {
    style: Style;
    stage: RuntimeStage;
    slots: RuntimeSlot[];
    frame: RuntimeImageFrame;
    handlers: RuntimeSlotHandler[];
    context: ExpressionContext;
};

type Props = EnhancedStageSlotProps & StoreProps;

class EnhancedStageSlot extends StatefulComponent<Props> {

    render() {
        const self = this;
        const { style, stage, slots, frame, handlers, context } = this.props;

        return createElement<RzElementPrimitiveProps>(
            'container',
            {
                ...assignHandlers({
                    self,
                    dispatcher: null,
                    handlers,
                    context
                })
            },
            createElement<StageRendererProps>(StageRenderer, {
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
            }),
        );
    }
};

const mapStateToProps = (state: AppState, ownProps: EnhancedStageSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data),
    stage: selectRuntimeStage(ownProps.data.board)(state),
    slots: selectStageSlots(ownProps.data.board)(state),
    frame: selectStageFrame(ownProps.data.board)(state),
    handlers: selectSlotHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
});

export default connectToStore(mapStateToProps)(EnhancedStageSlot);