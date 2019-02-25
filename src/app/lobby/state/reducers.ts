import produce from 'immer';
import { LobbyFeatureState, initialState } from './shape';
import { LobbyAction } from './actions';
import {
    SELECT_SETUP
} from './actionTypes';

export const mainReducer = (
    state: LobbyFeatureState = initialState,
    action: LobbyAction
): LobbyFeatureState => {
    switch (action.type) {
        case SELECT_SETUP:
            return produce(state, draft => {
                draft.selectedSetup = action.payload;
            });
        default:
            return state;
    }
};