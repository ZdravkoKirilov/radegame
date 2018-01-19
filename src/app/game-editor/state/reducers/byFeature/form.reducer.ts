import { ActionReducer, combineReducers } from '@ngrx/store';

import {
    factionsReducer,
    fieldsReducer,
    mapReducer,
    resourcesReducer,
    activityReducer,
    questsReducer
} from '../exports';
import * as actionTypes from '../../actions/actionTypes';
import { Resources } from './resources.reducer';
import { Factions } from './factions.reducer';
import { BoardFields } from './fields.reducer';
import { GameActivity } from './activity.reducer';
import { GameQuest } from './quest.reducer';
import { MapState } from './map.reducer';

const reducers = {
    factions: factionsReducer,
    resources: resourcesReducer,
    fields: fieldsReducer,
    map: mapReducer,
    activities: activityReducer,
    quests: questsReducer,
};

export interface GameEditorForm {
    resources?: Resources;
    factions?: Factions;
    fields?: BoardFields;
    map?: MapState;
    activities?: GameActivity;
    quests?: GameQuest;
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
