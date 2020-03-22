import { RuntimeStage, RuntimeSlot, StageRendererProps, StageRenderer, RuntimeImageFrame } from "@app/game-mechanics";
import { Memo, createElement, RzElementPrimitiveProps } from "@app/render-kit";
import NodeFactory, { NodeFactoryProps } from "../Factory";
import StaticStage, { StaticStageProps } from "../StaticStage";

export type RoundStageProps = {
    stage: RuntimeStage;
    slots: RuntimeSlot[];
    frame: RuntimeImageFrame;
}

type Props = RoundStageProps;

export const RoundStage = Memo<Props>(({ stage, slots, frame }) => {
    return createElement<StageRendererProps>(
        StageRenderer,
        {
            renderChild: (slot: RuntimeSlot) => {
                return createElement<RzElementPrimitiveProps>(
                    'container',
                    { styles: { x: slot.x, y: slot.y } },
                    createElement<NodeFactoryProps>(
                        NodeFactory,
                        { data: slot }
                    )
                )

            },
            slots,
            stage,
            style: { width: stage.width, height: stage.height },
            frame,
            renderStaticStage: stage => {
                return createElement<StaticStageProps>(StaticStage, {
                    stage,
                    style: { width: stage.width, height: stage.height }
                });
            }
        }
    )
}, ['stage', 'slots', 'frame']);