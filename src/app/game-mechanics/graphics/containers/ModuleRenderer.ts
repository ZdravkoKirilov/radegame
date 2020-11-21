/* import { Memo, createElement } from "@app/render-kit"; */

import { selectRuntimeModule, CommonGameStore } from "../../helpers";
import { RuntimeModule, Module } from "../../entities";
import { connectToStore } from "../../hocs";

/* import { DataLoader, DataLoaderProps } from "./DataLoader"; */
/* import { RootWidgetProps, RootWidget } from "./RootWidget";
import { DefaultLoader } from "../presentational"; */

type StoreProps = {
  runtimeModule: RuntimeModule;
}

export type ModuleRendererProps = {
  module: Module;
  fromParent?: {};
}

/* type Props = StoreProps & ModuleRendererProps; */

const moduleRenderer = () => {
 /*  const fallback = props.runtimeModule.loader ? createElement<RootWidgetProps>(
    RootWidget,
    { widget: props.runtimeModule.loader },
  ) : createElement(DefaultLoader); */

 /*  return createElement<DataLoaderProps>(
    DataLoader,
    {
      fallback,
    },
    createElement<RootWidgetProps>(
      RootWidget,
      {
        widget: runtimeModule.board, fromParent,
      }
    )
  ); */

  return null;
};

const mapStateToProps = (state: CommonGameStore, ownProps: ModuleRendererProps): StoreProps => ({
  runtimeModule: selectRuntimeModule(ownProps.module)(state),
});

export const ModuleRenderer = connectToStore(mapStateToProps)(moduleRenderer as any);