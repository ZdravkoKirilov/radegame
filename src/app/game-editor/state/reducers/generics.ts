import { ActionReducer, combineReducers } from '@ngrx/store';

import { EditorGenericAction, FormKey, formKeys } from '../actions/generics';
import { actionTypes } from '../actions/actionTypes';
import { GameEntity, GameEntityList, GameTemplate } from '../../../game-mechanics';
import { ConnectedEntities } from '../../../dynamic-forms';
import { AppState } from '../../../core';

export interface EntityFeature {
    items?: GameEntityList;
    lastChange?: GameEntity;
    lastDelete?: GameEntity;
    showEditor?: boolean;
    selectedItem?: GameEntity;
}

export interface EntityForm {
    [key: string]: EntityFeature;
}

const entityFeatureState = {
    items: null,
    lastChange: null,
    lastDelete: null,
    showEditor: false,
    selectedItem: null
}

const initialState: EntityForm = {
    resources: { ...entityFeatureState },
    trivia: { ...entityFeatureState },
    rounds: { ...entityFeatureState },
    quests: { ...entityFeatureState },
    stages: { ...entityFeatureState },
    fields: { ...entityFeatureState },
    activities: { ...entityFeatureState },
    factions: { ...entityFeatureState },
    locations: { ...entityFeatureState },
    paths: { ...entityFeatureState },
}

export const createEntityReducer = (allowedKey: FormKey): ActionReducer<EntityFeature> => {
    const entityReducer = (
        state: EntityFeature = { ...entityFeatureState },
        action: EditorGenericAction): EntityFeature => {
        const key = action.payload ? action.payload.key : '' as FormKey;
        let data;
        if (key === allowedKey) {
            switch (action.type) {
                case actionTypes.SET_ITEM:
                    data = action.payload.data as GameEntity;
                    return {
                        ...state,
                        items: {
                            ...state.items,
                            [data.id]: { ...data }
                        },
                        lastChange: { ...data }
                    };
                case actionTypes.REMOVE_ITEM:
                    data = action.payload.data as GameEntity;
                    const items = { ...state.items };
                    delete items[data.id];
                    return {
                        ...state,
                        items, lastDelete: { ...data }
                    };
                case actionTypes.SET_ITEMS:
                    data = action.payload.data as GameEntityList;
                    return {
                        ...state,
                        items: {
                            ...state.items,
                            ...data
                        }

                    };
                case actionTypes.TOGGLE_EDITOR:
                    data = action.payload.data as boolean;
                    return {
                        ...state,
                        showEditor: data
                    };
                case actionTypes.CHANGE_SELECTED_ITEM:
                    data = action.payload.data as GameEntity;
                    return {
                        ...state,
                        selectedItem: { ...data }
                    };
                default:
                    return state;
            }
        }
        return state;
    }

    return entityReducer;
}

export const formReducer: ActionReducer<any> = combineReducers({
    factions: createEntityReducer(formKeys.FACTIONS),
    resources: createEntityReducer(formKeys.RESOURCES),
    fields: createEntityReducer(formKeys.FIELDS),
    locations: createEntityReducer(formKeys.LOCATIONS),
    paths: createEntityReducer(formKeys.PATHS),
    activities: createEntityReducer(formKeys.ACTIVITIES),
    quests: createEntityReducer(formKeys.QUESTS),
    rounds: createEntityReducer(formKeys.ROUNDS),
    trivia: createEntityReducer(formKeys.TRIVIA),
    stages: createEntityReducer(formKeys.STAGES),
});

export const metadataReducer: ActionReducer<any> = combineReducers({
    games: createEntityReducer('games')
});

export function editorMetaReducer(anyReducer: ActionReducer<any>): any {
    return function newReducer(state, action) {
        if (action.type === actionTypes.SET_ALL_ITEMS) {
            const payload = <GameTemplate>action.payload.data;
            const form = {};
            Object.keys(payload).forEach((key: FormKey) => {
                form[key] = {
                    ...state.form[key],
                    items: {
                        ...state.form[key].items,
                        ...payload[key]
                    }
                }
            });
            return {
                ...state,
                form: {
                    ...state.form,
                    ...form
                }
            }
        }
        return anyReducer(state, action);
    };
}

export const getItems = (key: FormKey, gameId?: number) => (state: EntityForm): GameEntity[] => {
    const items = state[key].items || {};
    if (gameId) {
        return Object.values(items).filter((elem: GameEntity) => elem.game === gameId);
    } else {
        return Object.values(items);
    }
}

export const getItemsList = (gameId: number, key: FormKey) => (state: EntityForm): GameEntityList => {
    return state[key].items;
}

export const getSelectedItem = (key: FormKey) => (state: EntityForm): GameEntity => {
    return state[key].selectedItem;
}

export const getEditorState = (key: FormKey) => (state: EntityForm): boolean => {
    return state[key].showEditor;
}

export const getEntities = (state: AppState): ConnectedEntities => {
    const result = <ConnectedEntities>{};

    for (let key in state.editor.form) {
        result[key] = Object.values(state.editor.form[key].items);
    }

    return result;
};
