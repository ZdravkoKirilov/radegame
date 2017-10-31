import {ActionReducer, combineReducers} from '@ngrx/store';

import {resourcesReducer, charactersReducer, metadataReducer, triviaReducer, fieldsReducer} from './exports';
import {GameEditorForm} from '../../../models/index';

const reducers: GameEditorForm = {
    metadata: metadataReducer,
    characters: charactersReducer,
    resources: resourcesReducer,
    trivia: triviaReducer,
    fields: fieldsReducer
};

const reducer: ActionReducer<GameEditorForm> = combineReducers(reducers);

function gameEditorFormReducer(state: any, action: any) {
    return reducer(state, action);
}

export {gameEditorFormReducer};
