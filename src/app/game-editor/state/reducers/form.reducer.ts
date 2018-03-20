import { ActionReducer, combineReducers, createSelector } from '@ngrx/store';

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
import {
    GamesList, Resources, Factions, BoardFields, GameActivity,
    GameQuest, MapState, GameRound, GameTrivia, GameStage
} from './byFeature';

import { selectFeature } from './selectors';

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

export type EditorSubfeature = GamesList | Resources | Factions | BoardFields |
    GameActivity | GameQuest | MapState | GameRound | GameTrivia | GameStage;

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

export const selectForm = createSelector(selectFeature, state => state.form);

export const shouldPreloadFeature = (data: EditorSubfeature) => data.fetchError ? true : (!data.items && !data.loading);
