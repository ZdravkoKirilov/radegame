import produce from 'immer';

import { GameInstance } from "../../models";
import { GameArenaAction, actionTypes } from "../actions";
import { GameTemplate } from '@app/game-mechanics';

export type ArenaState = Partial<{
    active_game: GameInstance;
    config: GameTemplate;
}>;

const initialState: ArenaState = {
    active_game: null,
    config: {} as GameTemplate,
};

export const arenaReducer = (state: ArenaState = initialState, action: GameArenaAction): ArenaState => {
    switch (action.type) {
        case actionTypes.FETCH_ACTIVE_GAME_SUCCESS:
            return produce(state, draft => {
                draft.active_game = action.payload;
            });
        case actionTypes.FETCH_GAME_CONFIG_SUCCESS:
            return produce(state, draft => {
                draft.config = action.payload;
            });
        default:
            return state;
    };
};