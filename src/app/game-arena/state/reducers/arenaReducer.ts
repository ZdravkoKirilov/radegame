import produce from 'immer';

import { GameInstance } from "../../models";
import { GameArenaAction, actionTypes } from "../actions";

export type ArenaState = {
    active_game: GameInstance;
};

const initialState: ArenaState = {
    active_game: null,
};

export const arenaReducer = (state: ArenaState = initialState, action: GameArenaAction): ArenaState => {
    switch (action.type) {
        case actionTypes.FETCH_ACTIVE_GAME_SUCCESS:
            return produce(state, draft => {
                draft.active_game = action.payload;
            });
        default:
            return state;
    };
};