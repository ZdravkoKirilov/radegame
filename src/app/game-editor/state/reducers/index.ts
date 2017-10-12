import actionTypes from '../actions/actionTypes';
import { Action } from '../actions/actions';
import { GameTemplate } from '../../../game-mechanics/models/GameTemplate';

import { ActionReducerMap } from '@ngrx/store';

export interface GameEditorFeature {
    form: GameTemplate;
}

export const reducers: ActionReducerMap<GameEditorFeature> = {
    form: gameEditorFormReducer
};

const initialState: GameTemplate = {
    metadata: {}
};

export function gameEditorFormReducer(state: GameTemplate = initialState, action: Action): GameTemplate {
    switch (action.type) {
        case actionTypes.UPDATE_FIELD:
            return {
                ...state,
                [action.payload.branch]: {
                    ...state[action.payload.branch],
                    ...action.payload.data
                }
            };
        default:
            return state;
    }
}