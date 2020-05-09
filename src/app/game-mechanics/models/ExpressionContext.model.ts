import get from "lodash/get";

import { Dictionary } from "@app/shared";

import { GameState, GameTemplate } from "./Game.model";
import { Player } from "./Player";
import { HomeMadeEventEmitter } from "../helpers/HomeMadeEventEmitter";

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