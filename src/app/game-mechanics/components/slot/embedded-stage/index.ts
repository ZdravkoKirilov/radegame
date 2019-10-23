import { RenderFunction, createElement, DynamicSprite } from "@app/render-kit";
import { Stage, Slot, ImageAsset } from "@app/game-mechanics";
import SlotOrchestrator, { Props as OrchestratorProps } from "../slot-orchestrator";

export type Props = {
    stage: Stage;
    slots: Slot[];
    image: ImageAsset;
}

const EmbeddedStage: RenderFunction<Props> = ({ stage, image, slots }) => {
    const nodes = slots.map(slot => {
        return createElement('container', { styles: { x: slot.x, y: slot.y }, key: slot.id },
            createElement<OrchestratorProps>(SlotOrchestrator, { data: slot }),
        );
    });

    return createElement('fragment', {},
        image ? createElement(DynamicSprite, {
            image: image.image, styles: {
                x: 5,
                y: 5,
                width: stage.width,
                height: stage.height,
            }
        }) : null,
        createElement('collection', {}, nodes),
    );
};

export default EmbeddedStage;