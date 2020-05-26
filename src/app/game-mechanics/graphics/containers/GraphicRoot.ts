import { Memo, createElement, RzElement } from "@app/render-kit";

import { CommonGameStore, selectRuntimeGame, selectExpressionContext, selectModuleFromGameSync } from "../../helpers";
import { Module, Widget, WidgetNode, RuntimeWidgetNode } from "../../entities";
import { Game, RuntimeGame, ExpressionContext } from "../../models";
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

type Props = StoreProps & GraphicRootRendererProps;

const graphicRootRenderer = Memo<Props>(props => {
  const { module, widget, node, fromParent, runtimeGame, renderWidgetChild, context } = props;

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
    currentModule = selectModuleFromGameSync(runtimeGame, context);
  }

  if (currentModule) {
    return createElement<ModuleRendererProps>(ModuleRenderer, { module: currentModule, fromParent });
  }

  console.error(props);
  throw new Error('Misconfigured GraphicRoot. It requires either a top level Widget or Module, but none was found.');
});

const mapStateToProps = (state: CommonGameStore, ownProps: GraphicRootRendererProps): StoreProps => ({
  runtimeGame: selectRuntimeGame(ownProps.game)(state),
  context: selectExpressionContext(state),
});

export const GraphicRootRenderer = connectToStore(mapStateToProps)(graphicRootRenderer);