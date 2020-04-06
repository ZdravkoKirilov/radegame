import { MetaReducer, ActionReducer } from "@ngrx/store";
import immer from 'immer';
import set from 'lodash/set';

import { ArenaState } from "./arenaReducer";
import { GameArenaAction, InGameAction, GameActionTypes } from "../actions";

function cleanMetaReducer(anyReducer: ActionReducer<any>) {
    return function newReducer(state: ArenaState, action: GameArenaAction) {

        switch (action.type) {
            default:
                return anyReducer(state, action);
        }
    };
};

export const gameStateMetaReducer = (anyReducer: ActionReducer<any>) => {
    return function gameStateReducer(state: ArenaState, action: InGameAction) {
        switch (action.type) {
            case GameActionTypes.MUTATE_STATE:
                return immer(state, draft => {
                    const { path, value } = action.payload;
                    set(draft.state, path, value);
                });
            default:
                return anyReducer(state, action);
        }
    };
}

export const metaReducers: MetaReducer<any>[] = [
    cleanMetaReducer, gameStateMetaReducer,
];