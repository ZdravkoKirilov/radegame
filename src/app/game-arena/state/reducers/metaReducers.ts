import { MetaReducer, ActionReducer } from "@ngrx/store";
import { ArenaState } from "./arenaReducer";
import { GameArenaAction } from "../actions";

export const metaReducers: MetaReducer<any>[] = [
    cleanMetaReducer
];

function cleanMetaReducer(anyReducer: ActionReducer<any>) {
    return function newReducer(state: ArenaState, action: GameArenaAction) {

        switch (action.type) {
            default:
                return anyReducer(state, action);
        }
    };
}