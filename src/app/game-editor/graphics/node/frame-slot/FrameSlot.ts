import { createElement, RenderFunction, } from "@app/render-kit";
import { AppState } from "@app/core";
import { FrameSlot, FrameSlotProps, RuntimeSlot, Style, connect, RuntimeImageFrame } from "@app/game-mechanics";
import { selectSlotStyle, selectSlotDefaultFrame } from '../../../state';

import StageSlot from '../stage-slot';

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
    style: selectSlotStyle(ownProps.data.id)(state),
    frame: selectSlotDefaultFrame(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(EnhancedFrameSlot);