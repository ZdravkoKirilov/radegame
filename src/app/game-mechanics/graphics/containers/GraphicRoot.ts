import { Memo, createElement, RzElement } from "@app/render-kit";

import { CommonGameStore, selectRuntimeGame, selectExpressionContext, selectModuleFromGameSync } from "../../helpers";
import { Module, Widget, RuntimeWidgetNode } from "../../entities";
import { Game, RuntimeGame, ExpressionContext } from "../../models";
import { connectToStore } from "../../hocs";

import { RootWidgetProps, RootWidget } from "./RootWidget";
import { ModuleRenderer, ModuleRendererProps } from "./ModuleRenderer";

type StoreProps = {
  runtimeGame: RuntimeGame;
  context: ExpressionContext;
}

export type GraphicRootRendererProps = {
  game: Game;
  module?: Module;
  widget?: Widget;
  renderWidgetChild?: (node: RuntimeWidgetNode) => RzElement;
}

type Props = StoreProps & GraphicRootRendererProps;

const graphicRootRenderer = Memo<Props>(props => {
  const { module, widget, runtimeGame, renderWidgetChild, context } = props;

  if (widget) { // ignore modules if the widget is passed already
    return createElement<RootWidgetProps>(
      RootWidget,
      {
        widget,
        renderChild: renderWidgetChild,
      }
    )
  }

  let currentModule = module;
  if (!currentModule) { // ignore dynamic module calculation if it is passed statically already
    currentModule = selectModuleFromGameSync(runtimeGame, context);
  }

  if (currentModule) {
    return createElement<ModuleRendererProps>(ModuleRenderer, { module: currentModule });
  }

  console.error(props);
  throw new Error('Misconfigured GraphicRoot. It requires either a top level Widget or Module, but none was found.');
});

const mapStateToProps = (state: CommonGameStore, ownProps: GraphicRootRendererProps): StoreProps => ({
  runtimeGame: selectRuntimeGame(ownProps.game)(state),
  context: selectExpressionContext(state),
});

export const GraphicRootRenderer = connectToStore(mapStateToProps)(graphicRootRenderer);