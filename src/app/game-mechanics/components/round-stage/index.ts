import { Stage, Slot, ImageAsset } from "../../entities";
import { Memo, createElement } from "@app/render-kit";

export type RoundStageProps = {
    stage: Stage;
    image: ImageAsset;
    slots: Slot[];
}

export const RoundStage = Memo<RoundStageProps>(props => {
    
    return createElement(
        'text',
        {
            value: props.stage.name,
            styles: {
                x: 100,
                y: 125,
            },
            textStyle: {
                fontSize: 18,
                stroke: '#141619',
                fill: '#141619'
            }
        }
    );
}, ['stage']);