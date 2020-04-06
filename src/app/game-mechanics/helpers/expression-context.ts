import get from 'lodash/get';

import { Player, GameState, GameTemplate } from "../models";
import { Expression } from "../entities";
import { parseAndBind } from './misc';
import { Dictionary, HomeMadeEventEmitter } from '@app/shared';

const eventBus = new HomeMadeEventEmitter();

export type CreateExpressionParams = {
  state: GameState;
  conf: GameTemplate;
  players: Dictionary<Player>;
  self: number;
  loaded_chunks: string[];

  mutateState: (payload: { path: string; value: any; broadcastTo?: number[] }) => void;
  mutateStateAndSave: (payload: { path: string; value: any; broadcastTo?: number[] }) => void;

  listenTo: Function;
  sendMessage: Function;
};

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

export const createExpressionContext = ({ self, conf, players, ...rest }: CreateExpressionParams): ExpressionContext => {
  const helpers = Object.values<Expression>(conf.expressions);

  const ctx = {
    conf, players,
    helpers: {},
    get $self(): Player {
      return Object.values(players).find(player => player.user === self);
    },
    $get: get,
    eventBus,
    ...rest,
  };

  ctx['helpers'] = composeHelpers(helpers, ctx);

  return ctx as ExpressionContext;
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