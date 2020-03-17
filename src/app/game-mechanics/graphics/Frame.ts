import { RuntimeImageFrame, RuntimeStage, Style } from "../entities";
import { RenderFunction, createElement, SpriteProps, DynamicSprite, RzElement } from "@app/render-kit";
import { combineStyles } from "../helpers";

export type FrameRendererProps = {
    renderStage: (stage: RuntimeStage) => RzElement;
    frame: RuntimeImageFrame;
    style: Style;
};

export const FrameRenderer: RenderFunction<FrameRendererProps> = ({ frame, renderStage, style }) => {
    const composedStyle = combineStyles(style, frame);

    if (frame.stage) {
        return renderStage(frame.stage);
    }

    if (frame.image) {
        return createElement<SpriteProps>(DynamicSprite, {
            image: frame.image.image, styles: {
                width: composedStyle.width,
                height: composedStyle.height,
                x: 0,
                y: 0,
            }
        });
    }
};