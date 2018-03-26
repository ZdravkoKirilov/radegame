// import { createSelector } from '@ngrx/store';

// import { GameAction } from '../../actions';
// import { Game, GameList } from '../../../../game-mechanics';
// import { GameEditorFeature } from '../main.reducer';
// import { selectFeature } from '../selectors';
// import { AppState } from '../../../../core';

// export interface GamesList {
//     items: GameList;
//     fetchError?: boolean;
//     loading?: boolean;
//     lastInsert?: Game;
//     lastDelete?: Game;
//     showEditor?: boolean;
//     selectedItem?: Game;
// }

// const initialState: GamesList = {
//     items: null,
//     fetchError: false,
//     loading: false,
//     lastInsert: null,
//     lastDelete: null,
//     showEditor: false,
//     selectedItem: null,
// };

// export const CREATE_GAME = 'CREATE_GAME';
// export const DELETE_GAME = 'DELETE_GAME';
// export const REMOVE_GAME = 'REMOVE_GAME';
// export const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';
// export const CREATE_GAME_FAIL = 'CREATE_GAME_FAIL';
// export const TOGGLE_GAME_EDITOR = 'TOGGLE_GAME_EDITOR';
// export const CHANGE_SELECTED_GAME = 'CHANGE_SELECTED_GAME';
// export const DELETE_GAME_SUCCESS = 'DELETE_GAME_SUCCESS';
// export const DELETE_GAME_FAIL = 'DELETE_GAME_FAIL';
// export const SET_GAMES = '[EDITOR]SET_GAMES';

// export function gamesReducer(state: GamesList = initialState, action: GameAction): GamesList {
//     switch (action.type) {
//         case SET_GAMES:
//             return {
//                 ...state,
//                 items: {
//                     ...state.items,
//                     ...action.payload
//                 }
//             };
//         case CREATE_GAME_SUCCESS:
//             return {
//                 ...state,
//                 items: {
//                     ...state.items,
//                     [action.payload.title]: action.payload
//                 },
//                 lastInsert: action.payload

//             };
//         case REMOVE_GAME:
//             const items = { ...state.items };
//             delete items[action.payload.id];
//             return { ...state, items, lastDelete: action.payload };
//         case TOGGLE_GAME_EDITOR:
//             return {
//                 ...state,
//                 showEditor: action.payload
//             };
//         case CHANGE_SELECTED_GAME:
//             return {
//                 ...state,
//                 selectedItem: action.payload
//             };
//         default:
//             return state;
//     }
// }

// export const selectGamesFeature = createSelector(selectFeature, state => {
//     return state.games;
// });

// export const selectGames = (state: AppState) => state.editor.games.items ? Object.values(state.editor.games.items) : [];
// export const selectGamesList = (state: AppState) => state.editor.games.items;
// export const selectGameEditorToggleState = (state: AppState) => state.editor.games.showEditor;
// export const getSelectedGame = (state: AppState) => state.editor.games.selectedItem;
