import { ActionReducer, combineReducers } from '@ngrx/store';
import produce from 'immer';
import get from 'lodash/get';

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
        const key = get(action, ['payload', 'key'], '');
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
    tokens: createEntityReducer(ALL_ENTITIES.tokens),
    modules: createEntityReducer(ALL_ENTITIES.modules),
    choices: createEntityReducer(ALL_ENTITIES.choices),
    widgets: createEntityReducer(ALL_ENTITIES.widgets),
    games: createEntityReducer(ALL_ENTITIES.games),
    images: createEntityReducer(ALL_ENTITIES.images),
    styles: createEntityReducer(ALL_ENTITIES.styles),
    sounds: createEntityReducer(ALL_ENTITIES.sounds),
    sandboxes: createEntityReducer(ALL_ENTITIES.sandboxes),
    expressions: createEntityReducer(ALL_ENTITIES.expressions),
    animations: createEntityReducer(ALL_ENTITIES.animations),
    setups: createEntityReducer(ALL_ENTITIES.setups),
    transitions: createEntityReducer(ALL_ENTITIES.transitions),
    texts: createEntityReducer(ALL_ENTITIES.texts),
    sonatas: createEntityReducer(ALL_ENTITIES.sonatas),
    shapes: createEntityReducer(ALL_ENTITIES.shapes),
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
