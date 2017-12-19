import { ActionReducer, combineReducers } from '@ngrx/store';

import {
    factionsReducer,
    fieldsReducer,
    gridReducer,
    mapReducer,
    metadataReducer,
    resourcesReducer,
    triviaReducer,
    activityReducer
} from '../exports';
import * as actionTypes from '../../actions/actionTypes';
import { Resources } from './resources.reducer';
import { Factions } from './factions.reducer';
import { Trivias } from './trivia.reducer';
import { BoardFields } from './fields.reducer';
import { GameActivity } from './activity.reducer';
import { MapState } from './map.reducer';
import { Grid, GameMetadata } from '../../../../game-mechanics/models/index';

const reducers = {
    metadata: metadataReducer,
    factions: factionsReducer,
    resources: resourcesReducer,
    trivia: triviaReducer,
    fields: fieldsReducer,
    map: mapReducer,
    grid: gridReducer,
    activities: activityReducer,
};

export interface GameEditorForm {
    metadata?: GameMetadata;
    resources?: Resources;
    factions?: Factions;
    trivia?: Trivias;
    fields?: BoardFields;
    map?: MapState;
    grid?: Grid;
    activities?: GameActivity;
}

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

export { gameEditorFormReducer, gameEditorFormMetareducer };
