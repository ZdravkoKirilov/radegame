import produce from 'immer';

import { GameInstance } from "../../models";
import { GameArenaAction, actionTypes } from "../actions";
import { GameTemplate, Game, GameState } from '@app/game-mechanics';

export type ArenaState = Partial<{
    game_instance: GameInstance;
    game: Game;
    config: GameTemplate;
    state: GameState;
}>;

const initialState: ArenaState = {
    game_instance: null,
    config: null,
    game: null,
    state: null,
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
        case actionTypes.FETCH_GAME_SUCCESS:
            return produce(state, draft => {
                draft.game = action.payload;
            });
        case actionTypes.SET_GAME_STATE:
            return produce(state, draft => {
                draft.state = action.payload;
            });
        default:
            return state;
    };
};