import { createElement, RenderFunction, } from "@app/render-kit";
import { AppState } from "@app/core";
import { FrameSlot, FrameSlotProps, Slot, Style, connect, ImageFrame } from "@app/game-mechanics";
import { selectSlotStyle, selectSlotItemDefaultFrame } from '../../../../../state';

export type EnhancedItemSlotProps = {
    data: Slot;
}

type StoreProps = {
    style: Style;
    frame: ImageFrame;
};

const EnhancedItemSlot: RenderFunction<EnhancedItemSlotProps & StoreProps> = ({ style, frame }) => {
    const composedStyle = { ...style, ...frame.style, ...frame.style_inline };
    return createElement<FrameSlotProps>(FrameSlot, {
        frame: frame,
        style: composedStyle,
        forStage: null,
    });
};

const mapStateToProps = (state: AppState, ownProps: EnhancedItemSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data.id)(state),
    frame: selectSlotItemDefaultFrame(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(EnhancedItemSlot);