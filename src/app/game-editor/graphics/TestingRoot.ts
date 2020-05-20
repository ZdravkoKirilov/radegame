import { GraphicRootRendererProps, StoreProviderProps, StoreProvider, GraphicRootRenderer } from "@app/game-mechanics";
import { RenderFunction, createElement } from "@app/render-kit";

export type EditorSandboxRootProps = GraphicRootRendererProps & StoreProviderProps;

export const EditorSandboxRoot: RenderFunction<EditorSandboxRootProps> = ({ store, selectCommonGameStore, ...rest }) => {
  return (
    createElement<StoreProviderProps>(
      StoreProvider,
      { store, selectCommonGameStore },
      createElement<GraphicRootRendererProps>(
        GraphicRootRenderer,
        { ...rest }
      )
    )
  )
};