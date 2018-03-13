import { ActionReducer, combineReducers } from '@ngrx/store';

import {
    factionsReducer,
    fieldsReducer,
    mapReducer,
    resourcesReducer,
    activityReducer,
    questsReducer,
    roundsReducer,
    triviaReducer,
    stageReducer,
} from './byFeature';
import { CLEAR_FORM } from '../actions';
import { Resources } from './byFeature/resources.reducer';
import { Factions } from './byFeature/factions.reducer';
import { BoardFields } from './byFeature/fields.reducer';
import { GameActivity } from './byFeature/activity.reducer';
import { GameQuest } from './byFeature/quest.reducer';
import { MapState } from './byFeature/map.reducer';
import { GameRound } from './byFeature/round.reducer';
import { GameTrivia } from './byFeature/trivia.reducer';
import { GameStage } from './byFeature/stage.reducer';

const reducers = {
    factions: factionsReducer,
    resources: resourcesReducer,
    fields: fieldsReducer,
    map: mapReducer,
    activities: activityReducer,
    quests: questsReducer,
    rounds: roundsReducer,
    trivia: triviaReducer,
    stages: stageReducer,
};

export interface GameEditorForm {
    resources?: Resources;
    factions?: Factions;
    fields?: BoardFields;
    map?: MapState;
    activities?: GameActivity;
    quests?: GameQuest;
    rounds?: GameRound;
    stages?: GameStage;
    trivia?: GameTrivia;
}

const reducer: ActionReducer<GameEditorForm> = combineReducers(reducers);

function gameEditorFormReducer(state: any, action: any) {
    return reducer(state, action);
}

function gameEditorFormMetareducer(anyReducer: ActionReducer<any>): any {
    return function newReducer(state, action) {
        if (action.type === CLEAR_FORM) {
            state = {
                ...state,
                form: undefined
            };
        }
        return anyReducer(state, action);
    };
}

export { gameEditorFormReducer, gameEditorFormMetareducer };
