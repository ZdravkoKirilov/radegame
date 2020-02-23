import { RuntimeSlot } from "@app/game-mechanics";
import { Memo, createElement } from "@app/render-kit";

import EnhancedTextSlot, { EnhancedTextSlotProps } from './TextSlot';
import EnhancedShapeSlot, { EnhancedShapeSlotProps } from './ShapeSlot';

export type NodeFactoryProps = {
    data: RuntimeSlot;
}

const NodeFactory = Memo<NodeFactoryProps>(({ data }) => {

    if (data.display_text) {
        return createElement<EnhancedTextSlotProps>(EnhancedTextSlot, { data });
    }
    if (data.shape) {
        return createElement<EnhancedShapeSlotProps>(EnhancedShapeSlot, { data });
    }

    throw new Error('Undetermined slot type: ' + data.name);

}, ['data']);

export default NodeFactory;