import * as actionTypes from '../actions/actionTypes';
import { GameTemplate } from '../../../game-mechanics/models/GameTemplate';
import { GameEditorFeature } from '../models/GameEditorFeature';
import { Actions } from '../actions/actions';

import { ActionReducerMap } from '@ngrx/store';

export const reducers: ActionReducerMap<GameEditorFeature> = {
    form: gameEditorFormReducer
};

const initialState: GameTemplate = {
    metadata: {},
    resources: {}
};

export function gameEditorFormReducer(state: GameTemplate = initialState, action: Actions): GameTemplate {
    switch (action.type) {
        case actionTypes.UPDATE_FIELD:
            return {
                ...state,
                [action.payload.branch]: {
                    ...state[action.payload.branch],
                    ...action.payload.data
                }
            };
        case actionTypes.SAVE_RESOURCE_SUCCESS:
            return {
                ...state,
                resources: {
                    ...state.resources,
                    items: {
                        [action.payload.id]: action.payload
                    },
                    lastInsert: action.payload
                }
            }
        default:
            return state;
    }
}