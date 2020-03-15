import { RenderFunction, createElement, SpriteProps, DynamicSprite, CompositeType } from "@app/render-kit";
import { selectSlotStyle, selectSlotItemDefaultFrame } from "../../../../state";
import FrameStage from "../frame-stage";
import { AppState } from "@app/core";
import { RuntimeSlot, Style, RuntimeImageFrame, connectToStore, Stage } from "@app/game-mechanics";

export type ItemSlotProps = {
    style: Style;
    forStage: CompositeType<{ stage: Stage, style: Style }>;

    frame?: RuntimeImageFrame;
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

export type EnhancedItemSlotProps = {
    data: RuntimeSlot;
}

type StoreProps = {
    style: Style;
    frame: RuntimeImageFrame;
};

const EnhancedItemSlot: RenderFunction<EnhancedItemSlotProps & StoreProps> = ({ style, frame }) => {
    const composedStyle = { ...style, ...frame.style_inline };
    return createElement<ItemSlotProps>(ItemSlot, {
        frame: frame,
        style: composedStyle,
        forStage: FrameStage,
    });
};

const mapStateToProps = (state: AppState, ownProps: EnhancedItemSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data),
    frame: selectSlotItemDefaultFrame(ownProps.data.id)(state),
});

export default connectToStore(mapStateToProps)(EnhancedItemSlot);