import { Actions } from '../../actions/byFeature/asset.action';
import { Game } from '../../../../game-mechanics/models/index';
import { createSelector } from '@ngrx/store';
import { GameEditorFeature } from '../index';
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

export const selectGame = createSelector(selectFeature, (state: GameEditorFeature): Game => {
    return state.assets.game;
});