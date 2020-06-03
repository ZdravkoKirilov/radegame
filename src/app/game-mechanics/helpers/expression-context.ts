import get from 'lodash/get';

import { Dictionary } from '@app/shared';
import { createElement } from '@app/render-kit';

import { ExpressionContext, GameState, GameTemplate, Player } from "../models";
import { Expression } from "../entities";
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
  setup: number;
  module?: number;
};

export const createGameState = (payload: CreateStateParams): GameState => {
  const { setup, module } = payload;

  return {
    setup,
    module,
  };
};

export type CreateExpressionParams = {
  conf: GameTemplate;
  state: GameState;
  loaded_modules: string[] | number[];
  players: Player[];
  self: Player;
}