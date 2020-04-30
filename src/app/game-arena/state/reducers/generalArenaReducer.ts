import produce from 'immer';

import { GameInstance } from "../../models";
import { GameArenaAction, ArenaGeneralActionTypes, LobbyActionTypes, StartGame } from "../actions";
import { GameTemplate, Game } from '@app/game-mechanics';

export type GeneralArenaState = Partial<{
    game_instance: GameInstance;
    game: Game;
    config: GameTemplate;
    loaded_chunks: string[];
}>;

const initialState: GeneralArenaState = {
    game_instance: null,
    config: null,
    game: null,
    loaded_chunks: [],
};

export const generalArenaReducer = (state: GeneralArenaState = initialState, action: GameArenaAction | StartGame): GeneralArenaState => {
    switch (action.type) {
        case ArenaGeneralActionTypes.FETCH_GAME_INSTANCE_SUCCESS:
            return produce(state, draft => {
                draft.game_instance = action.payload;
            });
        case LobbyActionTypes.START_GAME:
            return produce(state, draft => {
                draft.game_instance = action.payload.game;
            });
        case ArenaGeneralActionTypes.FETCH_GAME_CONFIG_SUCCESS:
            return produce(state, draft => {
                draft.config = action.payload.config;
                draft.loaded_chunks = [...draft.loaded_chunks, ...action.payload.keywords];
            });
        case ArenaGeneralActionTypes.FETCH_GAME_SUCCESS:
            return produce(state, draft => {
                draft.game = action.payload;
            });
        default:
            return state;
    };
};