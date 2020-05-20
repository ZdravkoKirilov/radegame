import immer from 'immer';
import set from 'lodash/set';

import { GameActionTypes, InGameAction } from "../actions";
import { GameState } from "@app/game-mechanics";

export type ArenaGameState = GameState;

export function gameStateReducer(state: ArenaGameState, action: InGameAction): ArenaGameState {
    switch (action.type) {
        case GameActionTypes.MUTATE_STATE:
            return immer(state, draft => {
                const { path, value } = action.payload;
                set(draft, path, value);
            });
        case GameActionTypes.SET_GAME_STATE:
            return { ...action.payload };
        default:
            return state;
    }
};
