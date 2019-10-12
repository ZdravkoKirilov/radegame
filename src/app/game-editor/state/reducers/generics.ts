import { ActionReducer, combineReducers } from '@ngrx/store';
import produce from 'immer';

import { actionTypes, FILL_FORM } from '../actions/actionTypes';

import { GameEntity, GameEntityList, AllEntity, ALL_ENTITIES } from '@app/game-mechanics';
import { EditorGenericAction, EditorAction, FillFormAction } from '../actions';
import { Dictionary } from '@app/shared';
import { GameEditorFeature } from './main.reducer';

export interface EntityFeature {
    items?: GameEntityList;
    lastChange?: GameEntity;
    lastDelete?: GameEntity;
    showEditor: boolean;
    selectedEntity: GameEntity;
}

export type EntityForm = Dictionary<EntityFeature>;

const entityFeatureState: EntityFeature = {
    items: null,
    lastChange: null,
    lastDelete: null,
    showEditor: false,
    selectedEntity: null,
}

export const createEntityReducer = (allowedKey: AllEntity | string): ActionReducer<EntityFeature> => {
    const entityReducer = (
        state: EntityFeature = { ...entityFeatureState },
        action: EditorGenericAction): EntityFeature => {
        const key = action.payload ? action.payload.key : '' ;
        let data;
        if (key === allowedKey) {
            switch (action.type) {
                case actionTypes.SET_ITEM:
                    data = action.payload.data as GameEntity;
                    return produce(state, draft => {
                        draft.items[data.id] = data;
                        draft.lastChange = data
                    });
                case actionTypes.REMOVE_ITEM:
                    data = action.payload.data as GameEntity;
                    return produce(state, draft => {
                        delete draft.items[data.id];
                        draft.lastDelete = data;
                    });
                case actionTypes.SET_ITEMS:
                    data = action.payload.data as GameEntityList;
                    return produce(state, draft => {
                        draft.items = data;
                    });
                case actionTypes.CHANGE_SELECTED_ITEM:
                    data = action.payload.data as GameEntity;
                    return produce(state, draft => {
                        draft.selectedEntity = data;
                    });
                case actionTypes.TOGGLE_EDITOR:
                    data = action.payload.data as boolean;
                    return produce(state, draft => {
                        draft.showEditor = data;
                    });
                default:
                    return state;
            }
        }
        return state;
    }

    return entityReducer;
}

export const formReducer: ActionReducer<any> = combineReducers({
    factions: createEntityReducer(ALL_ENTITIES.factions),
    tokens: createEntityReducer(ALL_ENTITIES.tokens),
    fields: createEntityReducer(ALL_ENTITIES.fields),
    slots: createEntityReducer(ALL_ENTITIES.slots),
    paths: createEntityReducer(ALL_ENTITIES.paths),
    actions: createEntityReducer(ALL_ENTITIES.actions),
    conditions: createEntityReducer(ALL_ENTITIES.conditions),
    rounds: createEntityReducer(ALL_ENTITIES.rounds),
    phases: createEntityReducer(ALL_ENTITIES.phases),
    choices: createEntityReducer(ALL_ENTITIES.choices),
    stages: createEntityReducer(ALL_ENTITIES.stages),
    games: createEntityReducer(ALL_ENTITIES.games),
    teams: createEntityReducer(ALL_ENTITIES.teams),
    images: createEntityReducer(ALL_ENTITIES.images),
    keywords: createEntityReducer(ALL_ENTITIES.keywords),
    styles: createEntityReducer(ALL_ENTITIES.styles),
    sounds: createEntityReducer(ALL_ENTITIES.sounds),
    states: createEntityReducer(ALL_ENTITIES.states),
    expressions: createEntityReducer(ALL_ENTITIES.expressions),
    animations: createEntityReducer(ALL_ENTITIES.animations),
    handlers: createEntityReducer(ALL_ENTITIES.handlers),
    setups: createEntityReducer(ALL_ENTITIES.setups),
    transitions: createEntityReducer(ALL_ENTITIES.transitions),
    texts: createEntityReducer(ALL_ENTITIES.texts),
});

export function editorMetaReducer(anyReducer: ActionReducer<any>) {
    return function newReducer(state: GameEditorFeature, action: EditorAction) {

        switch (action.type) {
            case FILL_FORM:
                const { payload } = action as FillFormAction;
                const updatedForm = Object.keys(state.form).reduce((acc, key) => {
                    const currentItems = state.form[key] ? state.form[key].items : {};
                    acc[key] = { ...state.form[key], items: { ...currentItems, ...payload[key] } };
                    return acc;
                }, {} as EntityFeature);

                return {
                    ...state,
                    form: {
                        ...state.form,
                        ...updatedForm
                    }
                };
            default:
                return anyReducer(state, action) as GameEditorFeature;
        }
    };
}
