import { ResourceAction } from '../../actions';
import { Resource, ResourceList } from '../../../../game-mechanics';
import { createSelector } from '@ngrx/store';
import { GameEditorFeature } from '../main.reducer';
import { selectGame } from './assets.reducer';
import { selectFeature } from '../selectors';

export interface Resources {
    items?: ResourceList;
    fetchError?: boolean;
    loading?: boolean;
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
            const items = { ...state.items };
            delete items[action.payload.id];
            return { ...state, items, lastDelete: action.payload };
        case SET_RESOURCES:
            return { ...state, items: { ...state.items, ...action.payload } };
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

const selectCurrentFeature = createSelector(selectFeature, (state: GameEditorFeature): Resources => state.form.resources);

export const selectResources = createSelector(selectCurrentFeature, selectGame, (state, game): Resource[] => {
    return state.items ? Object.values(state.items).filter(elem => elem.game === game.id) : [];
});
export const selectResourceEditorToggleState = createSelector(selectCurrentFeature, (state): boolean => state.showEditor);
export const getSelectedResource = createSelector(selectCurrentFeature, (state): Resource => state.selectedItem);
