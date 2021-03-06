import { Memo, createElement } from "@app/render-kit";

import { selectRuntimeModule, CommonGameStore } from "../../helpers";
import { RuntimeModule, Module } from "../../entities";
import { connectToStore } from "../../hocs";

import { DataLoader, DataLoaderProps } from "./DataLoader";
import { RootWidgetProps, RootWidget } from "./RootWidget";
import { DefaultLoader } from "../presentational";

type StoreProps = {
  runtimeModule: RuntimeModule;
}

export type ModuleRendererProps = {
  module: Module;
  fromParent?: {};
}

type Props = StoreProps & ModuleRendererProps;

const moduleRenderer = Memo<Props>(({ runtimeModule, fromParent }) => {
  const fallback = runtimeModule.loader ? createElement<RootWidgetProps>(
    RootWidget,
    { widget: runtimeModule.loader },
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
        widget: runtimeModule.board, fromParent,
      }
    )
  );
});

const mapStateToProps = (state: CommonGameStore, ownProps: ModuleRendererProps): StoreProps => ({
  runtimeModule: selectRuntimeModule(ownProps.module)(state),
});

export const ModuleRenderer = connectToStore(mapStateToProps)(moduleRenderer);