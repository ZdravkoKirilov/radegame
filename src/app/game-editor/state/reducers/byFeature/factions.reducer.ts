// import { createSelector } from '@ngrx/store';

// import { FactionAction } from '../../actions';
// import { Faction, FactionList } from '../../../../game-mechanics';
// import { GameEditorFeature } from '../main.reducer';
// import { selectGame } from './assets.reducer';
// import { selectFeature } from '../selectors';

// export interface Factions {
//     items?: FactionList;
//     fetchError?: boolean;
//     loading?: boolean;
//     lastInsert?: Faction;
//     lastDelete?: Faction;
//     showEditor?: boolean;
//     selectedItem?: Faction;
// }

// const initialState: Factions = {
//     items: null,
//     lastInsert: null,
//     lastDelete: null,
//     showEditor: false,
//     selectedItem: null
// };

// export const SAVE_FACTION = 'SAVE_FACTION';
// export const DELETE_FACTION = 'DELETE_FACTION';
// export const GET_FACTIONS = 'GET_FACTIONS';
// export const GET_FACTIONS_SUCCESS = 'GET_FACTIONS_SUCCESS';
// export const GET_FACTIONS_FAIL = 'GET_FACTIONS_FAIL';
// export const SET_FACTIONS = 'SET_FACTIONS';
// export const ADD_FACTION = 'ADD_FACTION';
// export const SAVE_FACTION_SUCCESS = 'SAVE_FACTION_SUCCESS';
// export const SAVE_FACTION_FAIL = 'SAVE_FACTION_FAIL';
// export const DELETE_FACTION_SUCCESS = 'DELETE_FACTION_SUCCESS';
// export const DELETE_FACTION_FAIL = 'DELETE_FACTION_FAIL';
// export const REMOVE_FACTION = 'REMOVE_FACTION';
// export const TOGGLE_FACTION_EDITOR = 'TOGGLE_FACTION_EDITOR';
// export const CHANGE_SELECTED_FACTION = 'CHANGE_SELECTED_FACTION';

// export function factionsReducer(state: Factions = initialState, action: FactionAction): Factions {
//     switch (action.type) {
//         case ADD_FACTION:
//             return {
//                 ...state,
//                 items: {
//                     ...state.items,
//                     [action.payload.id]: action.payload
//                 },
//                 lastInsert: action.payload

//             };
//         case REMOVE_FACTION:
//             const items = { ...state.items };
//             delete items[action.payload.id];
//             return { ...state, items, lastDelete: action.payload };
//         case SET_FACTIONS:
//             return {
//                 ...state,
//                 items: { ...state.items, ...action.payload }
//             };
//         case TOGGLE_FACTION_EDITOR:
//             return {
//                 ...state,
//                 showEditor: action.payload
//             };
//         case CHANGE_SELECTED_FACTION:
//             return {
//                 ...state,
//                 selectedItem: action.payload
//             };
//         default:
//             return state;
//     }
// }

// const selectCurrentFeature = createSelector(selectFeature, (state: GameEditorFeature): Factions => state.form.factions);

// export const selectFactions = createSelector(selectCurrentFeature, selectGame, (state, game): Faction[] => {
//     return state.items ? Object.values(state.items).filter(elem => elem.game === game.id) : [];
// });
// export const getSelectedFaction = createSelector(selectCurrentFeature, (state): Faction => state.selectedItem);
// export const selectFactionEditorState = createSelector(selectCurrentFeature, (state): boolean => state.showEditor);
