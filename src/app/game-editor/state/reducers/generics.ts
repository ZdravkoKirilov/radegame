import { ActionReducer, combineReducers } from '@ngrx/store';
import produce from 'immer';

import { FormKey, formKeys } from '../form-keys';
import { actionTypes, FILL_FORM } from '../actions/actionTypes';

import { GameEntity, GameEntityList } from '@app/game-mechanics';
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

export const createEntityReducer = (allowedKey: FormKey | string): ActionReducer<EntityFeature> => {
    const entityReducer = (
        state: EntityFeature = { ...entityFeatureState },
        action: EditorGenericAction): EntityFeature => {
        const key = action.payload ? action.payload.key : '' as FormKey;
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
    factions: createEntityReducer(formKeys.factions),
    tokens: createEntityReducer(formKeys.tokens),
    fields: createEntityReducer(formKeys.fields),
    slots: createEntityReducer(formKeys.slots),
    paths: createEntityReducer(formKeys.paths),
    actions: createEntityReducer(formKeys.actions),
    conditions: createEntityReducer(formKeys.conditions),
    rounds: createEntityReducer(formKeys.rounds),
    phases: createEntityReducer(formKeys.phases),
    choices: createEntityReducer(formKeys.choices),
    stages: createEntityReducer(formKeys.stages),
    games: createEntityReducer(formKeys.games),
    teams: createEntityReducer(formKeys.teams),
    images: createEntityReducer(formKeys.images),
    keywords: createEntityReducer(formKeys.keywords),
    styles: createEntityReducer(formKeys.styles),
    sounds: createEntityReducer(formKeys.sounds),
    states: createEntityReducer(formKeys.states),
    expressions: createEntityReducer(formKeys.expressions),
    animations: createEntityReducer(formKeys.animations),
    handlers: createEntityReducer(formKeys.handlers),
    setups: createEntityReducer(formKeys.setups),
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
