import get from 'lodash/get';
import { Action } from '@ngrx/store';

import { Player, GameState, GameTemplate } from "../models";
import { Expression } from "../entities";
import { parseAndBind } from './misc';
import { Dictionary, HomeMadeEventEmitter } from '@app/shared';

const eventBus = new HomeMadeEventEmitter();

type ActionCreator<T> = (payload: T) => {
  type: string;
  payload: T;
};

export type CreateExpressionParams = {
  state: GameState;
  conf: GameTemplate;
  players: Dictionary<Player>;
  self: number;
  loaded_chunks: string[];

  mutateState: ActionCreator<{ path: string; value: any; broadcastTo?: number[] }>;
  mutateStateAndSave: ActionCreator<{ path: string; value: any; broadcastTo?: number[] }>;

  listenTo: ActionCreator<{}>;
  sendMessage: ActionCreator<{}>;
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

export const createExpressionContext = ({ state, conf, self, players, loaded_chunks, ...actions }: CreateExpressionParams): ExpressionContext => {
  const helpers = Object.values<Expression>(conf.expressions);

  const ctx = {
    state, conf, players, loaded_chunks,
    helpers: {},
    get $self(): Player {
      return Object.values(players).find(player => player.user === self);
    },
    $get: get,
    eventBus,
    ...actions,
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