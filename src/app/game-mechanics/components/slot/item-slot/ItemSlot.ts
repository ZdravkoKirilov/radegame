import { RenderFunction, createElement, SpriteProps, DynamicSprite, CompositeType } from "@app/render-kit";
import { Style, ImageFrame, Stage } from '../../../entities';

export type ItemSlotProps = {
    style: Style;
    forStage: CompositeType<{ stage: Stage, style: Style }>;

    frame?: ImageFrame;
};

export const ItemSlot: RenderFunction<ItemSlotProps> = ({ style, frame, forStage }) => {
    if (frame.stage) {
        return createElement(forStage, { stage: frame.stage, style });
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

export default ItemSlot;