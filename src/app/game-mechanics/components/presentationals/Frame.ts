import { Style, RuntimeImageFrame } from "../../entities";
import { CompositeType, RenderFunction, createElement, SpriteProps, DynamicSprite } from "@app/render-kit";

export type FrameRendererProps = {
    style: Style;
    forStage: CompositeType;

    frame: RuntimeImageFrame;
};

export const FrameRenderer: RenderFunction<FrameRendererProps> = ({ style, frame, forStage }) => {

    if (frame.stage) {
        return createElement(forStage, { data: frame.stage, style });
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