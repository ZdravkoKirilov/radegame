import { Memo, createElement } from "@app/render-kit";
import {
    RuntimeSlot, FacadeSlot, SlotFacadeProps,
} from "@app/game-mechanics";

import TextSlot from '../text-slot';
import StageSlot from '../stage-slot';
import ShapeSlot from '../shape-slot';
import FrameSlot from '../frame-slot';
import ItemSlot from '../item-slot';

export type EnhancedFacadeSlotProps = {
    data: RuntimeSlot;
}

const EnhancedFacadeSlot = Memo<EnhancedFacadeSlotProps>(({ data }) => {
    return createElement<SlotFacadeProps>(
        FacadeSlot,
        {
            data,
            forFrame: FrameSlot,
            forItem: ItemSlot,
            forShape: ShapeSlot,
            forStage: StageSlot,
            forText: TextSlot,
        }
    );
});

export default EnhancedFacadeSlot;