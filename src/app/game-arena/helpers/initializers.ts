import {
  ExpressionContext, Expression, composeHelpers, composeStaticMembers,
  MutateStatePayload,
  CreateExpressionParams
} from "@app/game-mechanics"
  ;
import { MutateState } from '../state';

export const createArenaExpressionContext = (params: CreateExpressionParams): ExpressionContext => {
  const { conf, state, loaded_modules, players, self } = params;
  const helpers = Object.values<Expression>(conf.expressions || {});

  let context = {
    ...composeStaticMembers(),
    conf, state, loaded_modules, self, players,

    mutateState: (payload: MutateStatePayload) => new MutateState(payload),
    listenTo: () => null,
    sendMessage: () => null,
    helpers: null,
    saveToProfile: null,

  } as any;

  context.helpers = composeHelpers(helpers, context);

  return context;
};