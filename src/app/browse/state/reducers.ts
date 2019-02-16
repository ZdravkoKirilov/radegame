import produce from 'immer';
import { BrowseFeatureState, initialState } from './shape';
import { BrowseAction } from './actions';
import { FETCH_GAMES_SUCCESS, FETCH_GAMES_FAIL, FETCH_GAMES, FETCH_GAME } from './actionTypes';

export const mainReducer = (
    state: BrowseFeatureState = initialState,
    action: BrowseAction
): BrowseFeatureState => {
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
        default:
            return state;
    }
};