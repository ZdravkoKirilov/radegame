import { RuntimeSlot } from "@app/game-mechanics";
import { Memo, createElement } from "@app/render-kit";

import EnhancedTextSlot, { EnhancedTextSlotProps } from './TextSlot';
import EnhancedShapeSlot, { EnhancedShapeSlotProps } from './ShapeSlot';
import EnhancedStageSlot, { EnhancedStageSlotProps } from "./StageSlot";
import EnhancedItemSlot, { EnhancedItemSlotProps } from './ItemSlot';

export type NodeFactoryProps = {
    data: RuntimeSlot;
    fromParent?: any;
}

const NodeFactory = Memo<NodeFactoryProps>(({ data, fromParent }) => {
    if (data.display_text || data.display_text_inline) {
        return createElement<EnhancedTextSlotProps>(EnhancedTextSlot, { data });
    }
    if (data.shape) {
        return createElement<EnhancedShapeSlotProps>(EnhancedShapeSlot, { data });
    }
    if (data.board) {
        return createElement<EnhancedStageSlotProps>(EnhancedStageSlot, { data, fromParent });
    }
    if (data.item) {
        return createElement<EnhancedItemSlotProps>(EnhancedItemSlot, { data, fromParent });
    }

    throw new Error('Undetermined slot type: ' + data.name);

}, ['data']);

export default NodeFactory;