import { AbstractRenderEngine } from "@app/render-kit";

import {
  ModuleRenderer, RootWidget, RootShape, RootText, RootItem, BasicTextNode, BasicShapeNode,
  RootNode
} from "../graphics";

export const registerComponents = (engine: AbstractRenderEngine) => {
  engine.factory.addCustomResolver({
    Module: ModuleRenderer,
    Widget: RootWidget,
    Shape: RootShape,
    Text: RootText,
    Item: RootItem,
    Node: RootNode,

    BasicText: BasicTextNode,
    BasicShape: BasicShapeNode,
  });
};