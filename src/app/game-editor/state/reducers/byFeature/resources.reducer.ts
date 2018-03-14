import { ResourceAction } from '../../actions';
import { Resource } from '../../../../game-mechanics';
import { createSelector } from '@ngrx/store';
import { GameEditorFeature } from '../index';
import { selectFeature } from '../selectors';

export interface Resources {
    items?: {
        [key: string]: Resource;
    };
    lastInsert?: Resource;
    lastDelete?: Resource;
    showEditor?: boolean;
    selectedItem?: Resource;
}

const initialState: Resources = {
    items: null,
    lastInsert: null,
    lastDelete: null,
    showEditor: false,
    selectedItem: null,
};

export const SAVE_RESOURCE = 'SAVE_RESOURCE';
export const DELETE_RESOURCE = 'DELETE_RESOURCE';
export const GET_RESOURCES = 'GET_RESOURCES';
export const ADD_RESOURCE = 'ADD_RESOURCE';
export const REMOVE_RESOURCE = 'REMOVE_RESOURCE';
export const SET_RESOURCES = 'SET_RESOURCES';
export const TOGGLE_RESOURCE_EDITOR = 'TOGGLE_RESOURCE_EDITOR';
export const CHANGE_SELECTED_RESOURCE = 'CHANGE_SELECTED_RESOURCE';
export const SAVE_RESOURCE_SUCCESS = 'SAVE_RESOURCE_SUCCESS';
export const SAVE_RESOURCE_FAIL = 'SAVE_RESOURCE_FAIL';
export const DELETE_RESOURCE_SUCCESS = 'DELETE_RESOURCE_SUCCESS';
export const DELETE_RESOURCE_FAIL = 'DELETE_RESOURCE_FAIL';
export const GET_RESOURCES_SUCCESS = 'GET_RESOURCES_SUCCESS';
export const GET_RESOURCES_FAIL = 'GET_RESOURCES_FAIL';

export function resourcesReducer(state: Resources = initialState, action: ResourceAction): Resources {
    switch (action.type) {
        case ADD_RESOURCE:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                lastInsert: action.payload
            };
        case REMOVE_RESOURCE:
            const items = {...state.items};
            delete items[action.payload.id];
            return {...state, items, lastDelete: action.payload};
        case SET_RESOURCES:
            return {...state, items: action.payload};
        case TOGGLE_RESOURCE_EDITOR:
            return {
                ...state,
                showEditor: action.payload
            };
        case CHANGE_SELECTED_RESOURCE:
            return {
                ...state,
                selectedItem: action.payload
            };
        default:
            return state;
    }
}

export const selectResources = createSelector(selectFeature, (state: GameEditorFeature) => {
    return state.form.resources.items ? Object.values(state.form.resources.items) : [];
});
export const selectResourceEditorToggleState = createSelector(selectFeature, (state: GameEditorFeature): boolean => {
    return state.form.resources.showEditor;
});
export const getSelectedResource = createSelector(selectFeature, (state: GameEditorFeature): Resource => {
    return state.form.resources.selectedItem;
});
