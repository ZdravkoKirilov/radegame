import { RenderFunction, createElement, DynamicSprite, SpriteProps, CompositeType } from "@app/render-kit";
import { Style, ImageFrame, Stage, ImageAsset } from "../../../entities";

export type FrameSlotProps = {
    style: Style;
    forStage: CompositeType<{ data: Stage, style: Style }>;

    frame?: ImageFrame;
};

export const FrameSlot: RenderFunction<FrameSlotProps> = ({ style, frame, forStage }) => {

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

export default FrameSlot;