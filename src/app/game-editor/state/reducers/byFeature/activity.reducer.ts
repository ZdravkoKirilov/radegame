import { createSelector } from '@ngrx/store';

import { Activity } from '../../../../game-mechanics/models/index';
import { selectFeature } from '../selectors';
import { GameEditorFeature } from '../index';
import { ActivityAction } from '../../actions/byFeature/activity.action';

export interface GameActivity {
    items?: {
        [key: string]: Activity
    };
    lastInsert?: Activity;
    lastDelete?: Activity;
    showEditor?: boolean;
    selectedItem?: Activity;
}

const initialState: GameActivity = {
    items: {},
    lastInsert: null,
    lastDelete: null,
    showEditor: false,
    selectedItem: null
};

export const SAVE_ACTIVITY = 'SAVE_ACTIVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const SET_ACTIVITIES = 'SET_ACTIVITIES';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const GET_ACTIVITIES_SUCCESS = 'GET_ACTIVITIES_SUCCESS';
export const GET_ACTIVITIES_FAIL = 'GET_ACTIVITIES_FAIL';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const SAVE_ACTIVITY_SUCCESS = 'SAVE_ACTIVITY_SUCCESS';
export const SAVE_ACTIVITY_FAIL = 'SAVE_ACTIVITY_FAIL';
export const DELETE_ACTIVITY_SUCCESS = 'DELETE_ACTIVITY_SUCCESS';
export const DELETE_ACTIVITY_FAIL = 'DELETE_ACTIVITY_FAIL';
export const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY';
export const TOGGLE_ACTIVITY_EDITOR = 'TOGGLE_ACTIVITY_EDITOR';
export const CHANGE_SELECTED_ACTIVITY = 'CHANGE_SELECTED_ACTIVITY';

export function activityReducer(state: GameActivity = initialState, action: ActivityAction): GameActivity {
    switch (action.type) {
        case ADD_ACTIVITY:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                lastInsert: action.payload

            };
        case REMOVE_ACTIVITY:
            const items = {...state.items};
            delete items[action.payload.id];
            return {...state, items, lastDelete: action.payload};
        case SET_ACTIVITIES:
            return {
                ...state,
                items: action.payload
            };
        case TOGGLE_ACTIVITY_EDITOR:
            return {
                ...state,
                showEditor: action.payload
            };
        case CHANGE_SELECTED_ACTIVITY:
            return {
                ...state,
                selectedItem: action.payload
            };
        default:
            return state;
    }
}

export const selectActivities = createSelector(selectFeature, (state: GameEditorFeature) => {
    return state.form.activities.items ? Object.values(state.form.factions.items) : [];
});
export const getSelectedActivity = createSelector(selectFeature, (state: GameEditorFeature): Activity => {
    return state.form.activities.selectedItem;
});
export const selectActivityEditorState = createSelector(selectFeature, (state: GameEditorFeature): boolean => {
    return state.form.activities.showEditor;
});