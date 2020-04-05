import { MetaReducer, ActionReducer } from "@ngrx/store";
import immer from 'immer';
import set from 'lodash/set';

import { ArenaState } from "./arenaReducer";
import { GameArenaAction, MutatorAction, MutatorTypes } from "../actions";

function cleanMetaReducer(anyReducer: ActionReducer<any>) {
    return function newReducer(state: ArenaState, action: GameArenaAction) {

        switch (action.type) {
            default:
                return anyReducer(state, action);
        }
    };
};

export const gameStateMetaReducer = (anyReducer: ActionReducer<any>) => {
    return function gameStateReducer(state: ArenaState, action: MutatorAction) {
        switch (action.type) {
            case MutatorTypes.MUTATE_STATE:
                return immer(state, draft => {
                    const { key, value } = action.payload;
                    set(draft.state, key, value);
                });
            default:
                return anyReducer(state, action);
        }
    };
}

export const metaReducers: MetaReducer<any>[] = [
    cleanMetaReducer, gameStateMetaReducer,
];