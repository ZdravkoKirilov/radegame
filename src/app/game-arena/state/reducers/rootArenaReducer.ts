import { combineReducers } from "@ngrx/store";

import { LobbyState, mainLobbyReducer } from "./lobbyReducer";
import { GeneralArenaState, generalArenaReducer } from "./generalArenaReducer";
import { ArenaGameState, gameStateReducer } from "./gameStateReducer";

export type ArenaState = {
  general: GeneralArenaState;
  state: ArenaGameState;
  lobby: LobbyState;
}

export const arenaRootReducer = combineReducers({
  general: generalArenaReducer,
  state: gameStateReducer,
  lobby: mainLobbyReducer,
});