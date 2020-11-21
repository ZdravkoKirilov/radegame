import get from 'lodash/get';

import { Dictionary } from '@app/shared';
import { createElement } from '@app/render-kit';

import { ExpressionContext, Player } from "../models";
import { Expression, GameState, GameTemplate, ModuleId, SetupId } from "../entities";
import { parseAndBind } from './misc';
import { HomeMadeEventEmitter } from './HomeMadeEventEmitter';

const eventBus = new HomeMadeEventEmitter();

export const composeHelpers = (expressions: Expression[], context: ExpressionContext) => {
  return expressions.reduce(
    (result, item) => {
      result[item.name] = parseAndBind(context)(item.code);
      return result;
    },
    {} as Dictionary<Function>
  );
};

export const composeStaticMembers = () => {
  return { get, eventBus, createElement } as Partial<ExpressionContext>;
};

export type CreateStateParams = {
  setup: SetupId;
  module?: ModuleId;
};

export const createGameState = (payload: CreateStateParams): GameState => {
  const { setup, module } = payload;

  return {
    setup,
    module: module as any,
  };
};

export type CreateExpressionParams = {
  conf: GameTemplate;
  state: GameState;
  loaded_modules: ModuleId[];
  players: Player[];
  self: Player;
}