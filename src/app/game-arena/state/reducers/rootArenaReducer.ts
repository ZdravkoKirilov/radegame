import { combineReducers } from "@ngrx/store";

import { GeneralArenaState, generalArenaReducer } from "./generalArenaReducer";
import { ArenaGameState, gameStateReducer } from "./gameStateReducer";

export type ArenaState = {
  general: GeneralArenaState;
  state: ArenaGameState;
}

export const arenaRootReducer = combineReducers({
  general: generalArenaReducer,
  state: gameStateReducer,
} as any);