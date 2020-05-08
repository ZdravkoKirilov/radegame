import { RuntimeWidgetNode } from "@app/game-mechanics";
import { Memo, createElement } from "@app/render-kit";

import EnhancedTextNode, { EnhancedTextNodeProps } from './TextNode';
import EnhancedShapeNode, { EnhancedShapeNodeProps } from './ShapeNode';
import EnhancedWidgetNode, { EnhancedWidgetNodeProps } from "./WidgetNode";
import EnhancedItemNode, { EnhancedItemNodeProps } from './ItemNode';

export type NodeFactoryProps = {
    data: RuntimeWidgetNode;
}

const NodeFactory = Memo<NodeFactoryProps>(({ data }) => {
    if (data.display_text || data.display_text_inline) {
        return createElement<EnhancedTextNodeProps>(EnhancedTextNode, { data });
    }
    if (data.shape) {
        return createElement<EnhancedShapeNodeProps>(EnhancedShapeNode, { data });
    }
    if (data.board) {
        return createElement<EnhancedWidgetNodeProps>(EnhancedWidgetNode, { data });
    }
    if (data.item) {
        return createElement<EnhancedItemNodeProps>(EnhancedItemNode, { data });
    }

    throw new Error('Undetermined node type: ' + data.name);

}, ['data']);

export default NodeFactory;