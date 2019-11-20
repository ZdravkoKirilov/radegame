import { createElement, RenderFunction, } from "@app/render-kit";
import { AppState } from "@app/core";
import { Slot, Style, connect, ImageFrame, ItemSlot, ItemSlotProps } from "@app/game-mechanics";
import { selectSlotStyle, selectSlotItemDefaultFrame } from '../../../../../state';

import FrameStage from '../frame-stage';

export type EnhancedItemSlotProps = {
    data: Slot;
}

type StoreProps = {
    style: Style;
    frame: ImageFrame;
};

const EnhancedItemSlot: RenderFunction<EnhancedItemSlotProps & StoreProps> = ({ style, frame }) => {
    const composedStyle = { ...style, ...frame.style, ...frame.style_inline };

    return createElement<ItemSlotProps>(ItemSlot, {
        frame: frame,
        style: composedStyle,
        forStage: FrameStage,
    });
};

const mapStateToProps = (state: AppState, ownProps: EnhancedItemSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data.id)(state),
    frame: selectSlotItemDefaultFrame(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(EnhancedItemSlot);