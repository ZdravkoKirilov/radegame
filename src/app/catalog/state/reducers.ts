import produce from 'immer';
import { CatalogFeatureState, initialState } from './shape';
import { CatalogAction } from './actions';
import {
    FETCH_GAMES_SUCCESS, FETCH_GAMES_FAIL, FETCH_GAMES,
    FETCH_GAME, FETCH_IMAGES_SUCCESS, FETCH_SETUPS_SUCCESS
} from './actionTypes';

export const mainReducer = (
    state: CatalogFeatureState = initialState,
    action: CatalogAction
): CatalogFeatureState => {
    switch (action.type) {
        case FETCH_GAMES:
            return produce(state, draft => {
                draft.loading = true;
            });
        case FETCH_GAMES_SUCCESS:
            return produce(state, draft => {
                draft.items = action.payload;
                draft.error = false;
                draft.loading = false;
            });
        case FETCH_GAMES_FAIL:
            return produce(state, draft => {
                draft.error = true;
                draft.loading = false;
            });
        case FETCH_GAME:
            return produce(state, draft => {
                draft.loading = true;
            });
        case FETCH_IMAGES_SUCCESS:
            return produce(state, draft => {
                draft.images = action.payload;
            });
        case FETCH_SETUPS_SUCCESS:
            return produce(state, draft => {
                draft.setups = action.payload;
            });
        default:
            return state;
    }
};