import { Memo, createElement } from "@app/render-kit";

import { selectRuntimeModule, CommonGameStore } from "../../helpers";
import { RuntimeModule, Module } from "../../entities";
import { connectToStore } from "../../hocs";

import { DataLoader, DataLoaderProps } from "./DataLoader";
import { RootWidgetProps, RootWidget } from "./RootWidget";
import { defaultChildRenderFunc } from "./WidgetNode";
import { DefaultLoader } from "../presentational";

type StoreProps = {
  runtimeModule: RuntimeModule;
}

export type ModuleRendererProps = {
  module: Module;
}

type Props = StoreProps;

const moduleRenderer = Memo<Props>(({ runtimeModule }) => {
  const fallback = runtimeModule.loader ? createElement<RootWidgetProps>(
    RootWidget,
    { widget: runtimeModule.loader, renderChild: defaultChildRenderFunc(null) },
  ) : createElement(DefaultLoader);

  return createElement<DataLoaderProps>(
    DataLoader,
    {
      fallback,
      load_done: runtimeModule.load_done,
      preload: runtimeModule.preload,
    },
    createElement<RootWidgetProps>(
      RootWidget,
      {
        widget: runtimeModule.board,
        renderChild: defaultChildRenderFunc(null),
      }
    )
  );
});

const mapStateToProps = (state: CommonGameStore, ownProps: ModuleRendererProps): StoreProps => ({
  runtimeModule: selectRuntimeModule(ownProps.module)(state),
});

export const ModuleRenderer = connectToStore(mapStateToProps)(moduleRenderer);