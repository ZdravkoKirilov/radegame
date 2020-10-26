import { Memo, createElement } from "@app/render-kit";

import { RuntimeWidgetNode } from "../../entities";

import EnhancedTextNode, { EnhancedTextNodeProps } from './TextNode';
import EnhancedShapeNode, { EnhancedShapeNodeProps } from './ShapeNode';
import EnhancedWidgetNode, { EnhancedWidgetNodeProps } from "./WidgetNode";
import EnhancedItemNode, { EnhancedItemNodeProps } from './ItemNode';
import EnhancedModuleNode, { ModuleNodeProps } from "./ModuleNode";

export type NodeFactoryProps = {
    data: RuntimeWidgetNode;
    fromParent?: any;
}

export const NodeFactory = Memo<NodeFactoryProps>(({ data, fromParent }) => {
    if (data.text || data.dynamic_text) {
        return createElement<EnhancedTextNodeProps>(EnhancedTextNode, { data, fromParent });
    }
    if (data.shape) {
        return createElement<EnhancedShapeNodeProps>(EnhancedShapeNode, { data, fromParent });
    }
    if (data.widget) {
        return createElement<EnhancedWidgetNodeProps>(EnhancedWidgetNode, { data, fromParent });
    }
    if (data.token) {
        return createElement<EnhancedItemNodeProps>(EnhancedItemNode, { data, fromParent });
    }
    if (data.module) {
        return createElement<ModuleNodeProps>(EnhancedModuleNode, { data, fromParent });
    }

    throw new Error('Undetermined node type: ' + data.name);

});

export default NodeFactory;