import { ActionReducer, combineReducers } from '@ngrx/store';

import {Actions} from '../actions/actions';
import * as actionTypes from '../actions/actionTypes';
import { resourcesReducer, charactersReducer, metadataReducer, triviaReducer } from './exports';
import { GameEditorForm } from '../models/index';

const reducers = {
    metadata: metadataReducer,
    characters: charactersReducer,
    resources: resourcesReducer,
    trivia: triviaReducer
};

const initialState: GameEditorForm = {
    metadata: {},
    resources: {},
    characters: {},
    trivia: {}
};

export const gameEditorFormReducer: ActionReducer<GameEditorForm> = combineReducers(reducers);
