import { RenderFunction, createElement, DynamicSprite, SpriteProps, CompositeType } from "@app/render-kit";
import StageSlot from "../stage-slot";
import { AppState } from "@app/core";
import { selectSlotStyle, selectSlotDefaultFrame } from "@app/game-arena";
import { Style, RuntimeImageFrame, RuntimeSlot, connectToStore } from "@app/game-mechanics";

export type FrameSlotProps = {
    style: Style;
    forStage: CompositeType;

    frame?: RuntimeImageFrame;
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

export type EnhancedFrameSlotProps = {
    data: RuntimeSlot;
}

type StoreProps = {
    style: Style;
    frame: RuntimeImageFrame;
};

const EnhancedFrameSlot: RenderFunction<EnhancedFrameSlotProps & StoreProps> = ({ style, frame }) => {
    const composedStyle = { ...style, ...frame.style_inline };
    return createElement<FrameSlotProps>(FrameSlot, {
        frame: frame,
        style: composedStyle,
        forStage: StageSlot,
    });
};

const mapStateToProps = (state: AppState, ownProps: EnhancedFrameSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data),
    frame: selectSlotDefaultFrame(ownProps.data.id)(state),
});

export default connectToStore(mapStateToProps)(EnhancedFrameSlot);