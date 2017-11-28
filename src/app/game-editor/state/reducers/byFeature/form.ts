import {ActionReducer, combineReducers} from '@ngrx/store';

import {resourcesReducer, factionsReducer, metadataReducer,
    triviaReducer, fieldsReducer, mapReducer, gridReducer} from './exports';
import {GameEditorForm} from '../../../models/index';
import * as actionTypes from '../../actions/actionTypes';

const reducers = {
    metadata: metadataReducer,
    factions: factionsReducer,
    resources: resourcesReducer,
    trivia: triviaReducer,
    fields: fieldsReducer,
    map: mapReducer,
    grid: gridReducer
};

const reducer: ActionReducer<GameEditorForm> = combineReducers(reducers);

function gameEditorFormReducer(state: any, action: any) {
    return reducer(state, action);
}

function gameEditorFormMetareducer(anyReducer: ActionReducer<any>): any {
    return function newReducer(state, action) {
        if (action.type === actionTypes.CLEAR_FORM) {
            state = {
                ...state,
                form: undefined
            };
        }
        return anyReducer(state, action);
    };
}

export {gameEditorFormReducer, gameEditorFormMetareducer};
