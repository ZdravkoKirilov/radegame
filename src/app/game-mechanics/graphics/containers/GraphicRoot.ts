import { createElement, RzElement } from "@app/render-kit";

import { CommonGameStore, selectRuntimeGame, selectExpressionContext } from "../../helpers";
import { Module, Widget, WidgetNode, RuntimeWidgetNode, RuntimeGame, Game } from "../../entities";
import {  ExpressionContext } from "../../models";
import { connectToStore } from "../../hocs";

import { RootWidgetProps, RootWidget } from "./RootWidget";
import { ModuleRenderer, ModuleRendererProps } from "./ModuleRenderer";
import { RootNode, RootNodeProps } from './RootNode';

type StoreProps = {
  runtimeGame: RuntimeGame;
  context: ExpressionContext;
}

export type GraphicRootRendererProps = Partial<{
  game: Game;
  module: Module;
  widget: Widget;
  node: WidgetNode;

  fromParent: {},
  renderWidgetChild?: (node: RuntimeWidgetNode) => RzElement;
}>

const graphicRootRenderer = (props: any) => {
  const { module, widget, node, fromParent, runtimeGame, renderWidgetChild } = props;

  if (widget) {
    return createElement<RootWidgetProps>(
      RootWidget,
      {
        widget, fromParent,
        renderChild: renderWidgetChild,
      }
    )
  }

  if (node) {
    return createElement<RootNodeProps>(
      RootNode,
      { node, fromParent }
    )
  }

  let currentModule = module;
  if (!currentModule && runtimeGame) { // ignore dynamic module calculation if it is passed statically already
    currentModule = {} as any //selectModuleFromGameSync(runtimeGame, context);
  }

  if (currentModule) {
    return createElement<ModuleRendererProps>(ModuleRenderer, { module: currentModule, fromParent });
  }

  console.error(props);
  throw new Error('Misconfigured GraphicRoot. It requires either a top level Widget or Module, but none was found.');
};

const mapStateToProps = (state: CommonGameStore, ownProps: GraphicRootRendererProps): StoreProps => ({
  runtimeGame: selectRuntimeGame(ownProps.game as any)(state),
  context: selectExpressionContext(state),
});

export const GraphicRootRenderer = connectToStore(mapStateToProps)(graphicRootRenderer as any);