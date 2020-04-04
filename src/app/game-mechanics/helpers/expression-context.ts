import get from 'lodash/get';

import { Player, GameState, GameTemplate } from "../models";
import { Expression } from "../entities";
import { parseAndBind } from './misc';
import { Dictionary, HomeMadeEventEmitter } from '@app/shared';

const eventBus = new HomeMadeEventEmitter();

export const createExpressionContext = ({ state, conf, self, players, loaded_chunks }: CreateExpressionParams): ExpressionContext => {
  const helpers = Object.values<Expression>(conf.expressions);

  const ctx = {
    state, conf, players, loaded_chunks,
    helpers: {},
    get $self(): Player {
      return Object.values(players).find(player => player.user === self);
    },
    $get: get,
    eventBus,

    // mutateState
    // mutateStateAndBroadcast
    // websocket connect. Chat / lobby / in-game
    // sendMessage / start game / delete game
  };

  ctx['helpers'] = composeHelpers(helpers, ctx);
  
  return ctx;
};

const composeHelpers = (expressions: Expression[], context: ExpressionContext) => {
  return expressions.reduce(
    (result, item) => {
      result[item.name] = parseAndBind(context)(item.code);
      return result;
    },
    {}
  );
};

type CreateExpressionParams = {
  state: GameState;
  conf: GameTemplate;
  players: Dictionary<Player>;
  self: number;
  loaded_chunks: string[];
}

export type ExpressionContext = {
  loaded_chunks: string[];
  state: GameState;
  conf: GameTemplate;
  players: Dictionary<Player>;
  helpers: {
      [key: string]: Function;
  },
  $self: Player,
  $get: typeof get,

  eventBus: HomeMadeEventEmitter;
};