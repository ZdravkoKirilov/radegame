import { createSelector } from '@ngrx/store';

import { Actions } from '../../actions';
import { Game } from '../../../../game-mechanics';
import { GameEditorFeature } from '../main.reducer';
import { selectFeature } from '../selectors';

export interface GameEditorAssets {
    game?: Game;
    preloadedGameIds?: number[];
}

const initialState: GameEditorAssets = {
    game: null,
    preloadedGameIds: [],
};

export const UPDATE_EDITOR_ASSET = 'UPDATE_EDITOR_ASSET';
export const GET_GAME = 'GET_GAME';
export const GET_GAME_SUCCESS = 'GET_GAME_SUCCESS';
export const GET_GAME_FAIL = 'GET_GAME_FAIL';

export function gameEditorAssetsReducer(state: GameEditorAssets = initialState, action: Actions): GameEditorAssets {
    switch (action.type) {
        case UPDATE_EDITOR_ASSET:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

const selectCurrentFeature = createSelector(selectFeature, (state: GameEditorFeature): GameEditorAssets => state.assets);

export const selectGame = createSelector(selectCurrentFeature, (state): Game => state.game);
