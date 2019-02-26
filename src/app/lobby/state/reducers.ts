import produce from 'immer';
import { LobbyFeatureState, initialState } from './shape';
import { LobbyAction } from './actions';
import {
    TOGGLE_FORM
} from './actionTypes';

export const mainReducer = (
    state: LobbyFeatureState = initialState,
    action: LobbyAction
): LobbyFeatureState => {
    switch (action.type) {
        case TOGGLE_FORM:
            return produce(state, draft => {
                draft.showForm = action.payload;
            });
        default:
            return state;
    }
};