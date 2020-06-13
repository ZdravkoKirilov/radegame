import get from "lodash/get";

import { GameState, GameTemplate } from "./Game.model";
import { Player } from "./Player";
import { HomeMadeEventEmitter } from "../helpers/HomeMadeEventEmitter";

export type ExpressionContext = {
  state: GameState;
  conf: GameTemplate;
  private_data: {};

  loaded_modules: number[];

  players: Player[];
  self: Player,

  helpers: { [key: string]: Function; }, // predefined expressions + html5 apis
  get: typeof get,
  createElement: Function; // render-kit

  disableInteractions?: boolean;

  eventBus: HomeMadeEventEmitter;

  mutateState: (payload: MutateStatePayload) => void; // game state
  saveToProfile: Function; // player settings
  listenTo: Function; // connect to sockets
  sendMessage: Function;  // send through sockets
};

export type MutateStatePayload = {
  path: string;
  value: any;
  broadcastTo?: number[];
  save?: boolean;
}