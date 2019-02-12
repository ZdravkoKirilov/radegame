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
}

export type EntityForm = Dictionary<EntityFeature>;

const entityFeatureState: EntityFeature = {
    items: null,
    lastChange: null,
    lastDelete: null,
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
    tokens: createEntityReducer(formKeys.TOKENS),
    fields: createEntityReducer(formKeys.FIELDS),
    slots: createEntityReducer(formKeys.SLOTS),
    paths: createEntityReducer(formKeys.PATHS),
    actions: createEntityReducer(formKeys.ACTIONS),
    conditions: createEntityReducer(formKeys.CONDITIONS),
    sources: createEntityReducer(formKeys.SOURCES),
    rounds: createEntityReducer(formKeys.ROUNDS),
    phases: createEntityReducer(formKeys.PHASES),
    choices: createEntityReducer(formKeys.CHOICES),
    stages: createEntityReducer(formKeys.STAGES),
    games: createEntityReducer(formKeys.GAMES),
    teams: createEntityReducer(formKeys.TEAMS),
    images: createEntityReducer(formKeys.IMAGES),
});

export function editorMetaReducer(anyReducer: ActionReducer<any>) {
    return function newReducer(state: GameEditorFeature, action: EditorAction) {

        switch (action.type) {
            case FILL_FORM:
                const { payload } = action as FillFormAction;

                return {
                    ...state,
                    form: payload
                };
            default:
                return anyReducer(state, action) as GameEditorFeature;
        }
        // if (action.type === actionTypes.SET_ALL_ITEMS) {
        //     const payload = <GameTemplate>action.payload.data;
        //     const form = {};
        //     Object.keys(payload).forEach((key: FormKey) => {
        //         form[key] = {
        //             ...state.form[key],
        //             items: {
        //                 ...state.form[key].items,
        //                 ...payload[key]
        //             }
        //         }
        //     });
        //     return {
        //         ...state,
        //         form: {
        //             ...state.form,
        //             ...form
        //         }
        //     }
        // }
    };
}
