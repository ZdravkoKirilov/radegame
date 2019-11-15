import { Memo, createElement } from "@app/render-kit";
import {
    Slot, FacadeSlot, SlotFacadeProps, ImageSlot,
    ItemSlot
} from "@app/game-mechanics";

import TextSlot from '../text-slot';
import StageSlot from '../stage-slot';
import ShapeSlot from '../shape-slot';

export type EnhancedFacadeSlotProps = {
    data: Slot;
}

const EnhancedFacadeSlot = Memo<EnhancedFacadeSlotProps>(({ data }) => {
    return createElement<SlotFacadeProps>(
        FacadeSlot,
        {
            data,
            forFrame: ImageSlot,
            forItem: ItemSlot,
            forShape: ShapeSlot,
            forStage: StageSlot,
            forText: TextSlot,
        }
    );
});

export default EnhancedFacadeSlot;