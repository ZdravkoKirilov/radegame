import { CreateExpressionParams, createExpressionContext } from "@app/game-mechanics";

export const createEditorExpressionContext = (params: Partial<CreateExpressionParams>) => {
  return createExpressionContext({
    ...params,
    mutateState: () => null,
    mutateStateAndSave: () => null,
    listenTo: () => null,
    sendMessage: () => null,
  } as CreateExpressionParams);
};