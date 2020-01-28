import { Style, RuntimeImageFrame, Stage } from "../../entities";
import { RenderFunction, createElement, SpriteProps, DynamicSprite, RzElement } from "@app/render-kit";

export type FrameRendererProps = {
    style: Style;
    renderStage: (stage: Stage) => RzElement;

    frame: RuntimeImageFrame;
};

export const FrameRenderer: RenderFunction<FrameRendererProps> = ({ style, frame, renderStage }) => {

    if (frame.stage) {
        return renderStage(frame.stage);
    }

    if (frame.image) {
        return createElement<SpriteProps>(DynamicSprite, {
            image: frame.image.image, styles: {
                width: style.width,
                height: style.height,
            }
        });
    }
};