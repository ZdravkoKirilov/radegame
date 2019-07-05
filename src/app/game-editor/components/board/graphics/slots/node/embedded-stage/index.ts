import { RenderFunction, createElement } from "@app/render-kit";
import { Stage, Slot } from "@app/game-mechanics";

export type Props = {
    stage: Stage;
    slots: Slot[];
}

const EmbeddedStage: RenderFunction<Props> = ({ stage }) => {

    return createElement('fragment', {},

    );
};

export default EmbeddedStage;