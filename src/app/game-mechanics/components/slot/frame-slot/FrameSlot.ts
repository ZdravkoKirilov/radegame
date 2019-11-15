import { RenderFunction, createElement, DynamicSprite, SpriteProps } from "@app/render-kit";
import { Style, ImageFrame, Stage, ImageAsset } from "../../../entities";

export type FrameSlotProps = {
    style: Style;
    frame: ImageFrame;
};

export const FrameSlot: RenderFunction<FrameSlotProps> = ({ style, frame }) => {
    const stage = frame.stage as Stage;
    const image = frame.image as ImageAsset;

    if (stage) {
        return null;
    }

    if (image) {
        return createElement<SpriteProps>(DynamicSprite, {
            image: image.image, styles: {
                x: 5,
                y: 15,
                width: style.width,
                height: style.height,
            }
        });
    }
};

export default FrameSlot;