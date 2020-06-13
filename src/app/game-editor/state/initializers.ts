import {
  Expression, composeStaticMembers, MutateStatePayload, ExpressionContext, composeHelpers,
  CreateExpressionParams
} from "@app/game-mechanics";

export const createEditorExpressionContext = (params: CreateExpressionParams) => {
  const { conf, state, loaded_modules, players, self } = params;
  const helpers = Object.values<Expression>(conf.expressions || {});

  let context = {
    ...composeStaticMembers(),
    conf, state, loaded_modules, self, players,

    mutateState: (payload: MutateStatePayload) => null,
    listenTo: () => null,
    sendMessage: () => null,
    helpers: null,
    saveToProfile: null,

    disableInteractions: true,

  } as ExpressionContext;

  context.helpers = composeHelpers(helpers, context);

  return context;
};

export const createSandboxExpressionContext = (params: CreateExpressionParams) => {
  const { conf, state, loaded_modules, players, self } = params;
  const helpers = Object.values<Expression>(conf.expressions || {});

  let context = {
    ...composeStaticMembers(),
    conf, state, loaded_modules, self, players,

    mutateState: (payload: MutateStatePayload) => null,
    listenTo: () => null,
    sendMessage: () => null,
    helpers: null,
    saveToProfile: null,

  } as ExpressionContext;

  context.helpers = composeHelpers(helpers, context);

  return context;
};