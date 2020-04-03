import { RuntimeSlot } from "@app/game-mechanics";
import { Memo, createElement } from "@app/render-kit";

import EnhancedTextSlot, { EnhancedTextSlotProps } from './TextSlot';
import EnhancedShapeSlot, { EnhancedShapeSlotProps } from './ShapeSlot';
import EnhancedStageSlot, { EnhancedStageSlotProps } from "./StageSlot";
import EnhancedItemSlot, { EnhancedItemSlotProps } from './ItemSlot';

export type NodeFactoryProps = {
    data: RuntimeSlot;
}

const NodeFactory = Memo<NodeFactoryProps>(({ data }) => {
    if (data.display_text || data.display_text_inline) {
        return createElement<EnhancedTextSlotProps>(EnhancedTextSlot, { data });
    }
    if (data.shape) {
        return createElement<EnhancedShapeSlotProps>(EnhancedShapeSlot, { data });
    }
    if (data.board) {
        return createElement<EnhancedStageSlotProps>(EnhancedStageSlot, { data });
    }
    if (data.item) {
        return createElement<EnhancedItemSlotProps>(EnhancedItemSlot, { data });
    }

    throw new Error('Undetermined slot type: ' + data.name);

}, ['data']);

export default NodeFactory;