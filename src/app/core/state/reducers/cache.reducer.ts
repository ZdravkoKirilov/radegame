import { createSelector, createFeatureSelector } from '@ngrx/store';

import { CoreAction, actionTypes } from '../actions';
import { GameTemplate, GameList } from '../../../game-mechanics';
import { AppState } from './main';

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
                    [(action.payload as any).game]: { ...(action.payload as any).data }
                }
            };
        case actionTypes.SET_GAMES:
            return {
                ...state,
                games: { ...state.games, ...action.payload }
            };
        default:
            return state;
    }
}

export const selectCacheFeature = createFeatureSelector<Cache>('cache');

export const selectPreloadedGameIds = createSelector(selectCacheFeature, state => Object.keys(state.gameAssets));

export const selectGameAssets = (gameId) => (state: AppState) => state.cache.gameAssets[gameId];

export const selectPreloadedGames = (state: AppState) => state.cache.games;
