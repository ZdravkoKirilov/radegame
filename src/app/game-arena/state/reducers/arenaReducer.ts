import produce from 'immer';

import { GameInstance } from "../../models";
import { GameArenaAction, actionTypes } from "../actions";
import { GameTemplate, Game } from '@app/game-mechanics';

export type ArenaState = Partial<{
    game_instance: GameInstance;
    game: Game;
    config: GameTemplate;
}>;

const initialState: ArenaState = {
    game_instance: null,
    config: null,
    game: null,
};

export const arenaReducer = (state: ArenaState = initialState, action: GameArenaAction): ArenaState => {
    switch (action.type) {
        case actionTypes.FETCH_GAME_INSTANCE_SUCCESS:
            return produce(state, draft => {
                draft.game_instance = action.payload;
            });
        case actionTypes.FETCH_GAME_CONFIG_SUCCESS:
            return produce(state, draft => {
                draft.config = action.payload;
            });
        case actionTypes.FETCH_GAME:
            return produce(state, draft => {
                draft.game = action.payload;
            });
        default:
            return state;
    };
};