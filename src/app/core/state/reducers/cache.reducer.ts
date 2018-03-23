import { createSelector, createFeatureSelector } from '@ngrx/store';

import { CoreAction, actionTypes } from '../actions';
import { GameTemplate, GameList } from '../../../game-mechanics';

export interface Cache {
    gameAssets: {
        [key: string]: GameTemplate
    };
    games: GameList;
}

const initialState: Cache = {
    gameAssets: {},
    games: {}
}

export const cacheReducer = (state: Cache = initialState, action: CoreAction) => {
    switch (action.type) {
        case actionTypes.ADD_GAME_ASSETS:
            return {
                ...state,
                gameAssets: {
                    ...state.gameAssets,
                    [(action.payload as any).game]: {...(action.payload as any).data}
                }
            };
        default:
            return state;
    }
}

export const selectCacheFeature = createFeatureSelector<Cache>('cache');

export const selectPreloadedGames = createSelector(selectCacheFeature, state => Object.keys(state.gameAssets));

export const selectGameAssets = (gameId) => createSelector(selectCacheFeature, (state): GameTemplate => state.gameAssets[gameId]);
