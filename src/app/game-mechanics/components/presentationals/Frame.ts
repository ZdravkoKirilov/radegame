import { RuntimeImageFrame, RuntimeStage, Style } from "../../entities";
import { RenderFunction, createElement, SpriteProps, DynamicSprite, RzElement } from "@app/render-kit";

export type FrameRendererProps = {
    renderStage: (stage: RuntimeStage) => RzElement;
    frame: RuntimeImageFrame;
};

export const FrameRenderer: RenderFunction<FrameRendererProps> = ({ frame, renderStage }) => {
    const style = frame.style(frame);

    if (frame.stage) {
        return renderStage(frame.stage);
    }

    if (frame.image) {
        return createElement<SpriteProps>(DynamicSprite, {
            image: frame.image.image, styles: {
                width: style.width,
                height: style.height,
                x: style.x,
                y: style.y,
                z_order: style.z_order,
            }
        });
    }
};