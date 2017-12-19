import { createSelector } from '@ngrx/store';

import { FactionAction } from '../../actions/byFeature/faction.action';
import { Faction } from '../../../../game-mechanics/models/index';
import { GameEditorFeature } from '../index';
import { selectFeature } from '../selectors';

export interface Factions {
    items?: {
        [key: string]: Faction
    };
    lastInsert?: Faction;
    lastDelete?: Faction;
    showEditor?: boolean;
    selectedItem?: Faction;
}

const initialState: Factions = {
    items: {},
    lastInsert: null,
    lastDelete: null,
    showEditor: false,
    selectedItem: null
};

export const SAVE_FACTION = 'SAVE_FACTION';
export const DELETE_FACTION = 'DELETE_FACTION';
export const SET_FACTIONS = 'SET_FACTIONS';
export const ADD_FACTION = 'ADD_FACTION';
export const SAVE_FACTION_SUCCESS = 'SAVE_FACTION_SUCCESS';
export const SAVE_FACTION_FAIL = 'SAVE_FACTION_FAIL';
export const DELETE_FACTION_SUCCESS = 'DELETE_FACTION_SUCCESS';
export const DELETE_FACTION_FAIL = 'DELETE_FACTION_FAIL';
export const REMOVE_FACTION = 'REMOVE_FACTION';
export const TOGGLE_FACTION_EDITOR = 'TOGGLE_FACTION_EDITOR';
export const CHANGE_SELECTED_FACTION = 'CHANGE_SELECTED_FACTION';

export function factionsReducer(state: Factions = initialState, action: FactionAction): Factions {
    switch (action.type) {
        case ADD_FACTION:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                lastInsert: action.payload

            };
        case REMOVE_FACTION:
            const items = {...state.items};
            delete items[action.payload.id];
            return {...state, items, lastDelete: action.payload};
        case SET_FACTIONS:
            return {
                ...state,
                items: action.payload
            };
        case TOGGLE_FACTION_EDITOR:
            return {
                ...state,
                showEditor: action.payload
            };
        case CHANGE_SELECTED_FACTION:
            return {
                ...state,
                selectedItem: action.payload
            };
        default:
            return state;
    }
}

export const selectFactions = createSelector(selectFeature, (state: GameEditorFeature) => {
    return state.form.factions.items ? Object.values(state.form.factions.items) : [];
});
export const getSelectedFaction = createSelector(selectFeature, (state: GameEditorFeature): Faction => {
    return state.form.factions.selectedItem;
});
export const selectFactionEditorState = createSelector(selectFeature, (state: GameEditorFeature): boolean => {
    return state.form.factions.showEditor;
});
