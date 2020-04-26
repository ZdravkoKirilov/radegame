import { GameState } from "@app/game-mechanics";

export const GameActionTypes = {
    MUTATE_STATE: '[Arena/GameAction] MUTATE_STATE',
    SET_GAME_STATE: '[Arena/GameAction] SET_GAME_STATE',
} as const;

export class MutateState {
    readonly type = GameActionTypes.MUTATE_STATE;
    constructor (public payload: {
        path: string;
        value: any;
        broadcastTo?: number[];
        save?: boolean;
    }) {}
}

export class SetGameState {
    readonly type = GameActionTypes.SET_GAME_STATE;
    constructor(public payload: GameState) { }
}

export type InGameAction = MutateState | SetGameState;