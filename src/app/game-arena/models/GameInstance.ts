import { ActiveGame } from "@app/core";
import { GameState } from "@app/game-mechanics";

export type GameInstance = ActiveGame & {
    state: GameState;
};