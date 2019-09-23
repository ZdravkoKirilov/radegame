import { MetaReducer, ActionReducer } from "@ngrx/store";
import immer from 'immer';

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
            case MutatorTypes.CHANGE_TURN:
                return immer(state, draft => {
                    draft.state.active_player = action.payload;
                });
            case MutatorTypes.CHANGE_ROUND:
                return immer(state, draft => {
                    draft.state.round = action.payload;
                });
            default:
                return anyReducer(state, action);
        }
    };
}

export const metaReducers: MetaReducer<any>[] = [
    cleanMetaReducer, gameStateMetaReducer,
];