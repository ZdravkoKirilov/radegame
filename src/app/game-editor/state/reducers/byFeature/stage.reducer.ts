// import { createSelector } from '@ngrx/store';

// import { Stage, StageList } from '../../../../game-mechanics';
// import { selectFeature } from '../selectors';
// import { GameEditorFeature } from '../main.reducer';
// import { selectGame } from './assets.reducer';
// import { StageAction } from '../../actions';

// export interface GameStage {
//     items?: StageList;
//     lastInsert?: Stage;
//     lastDelete?: Stage;
//     showEditor?: boolean;
//     selectedItem?: Stage;
//     fetchError?: boolean;
//     loading?: boolean;
// }

// const initialState: GameStage = {
//     items: null,
//     lastInsert: null,
//     lastDelete: null,
//     showEditor: false,
//     selectedItem: null
// };

// export const SAVE_STAGE = 'SAVE_STAGE';
// export const DELETE_STAGE = 'DELETE_STAGE';
// export const SET_STAGES = 'SET_STAGES';
// export const GET_STAGES = 'GET_STAGES';
// export const GET_STAGES_SUCCESS = 'GET_STAGES_SUCCESS';
// export const GET_STAGES_FAIL = 'GET_STAGES_FAIL';
// export const ADD_STAGE = 'ADD_v';
// export const SAVE_STAGE_SUCCESS = 'SAVE_STAGE_SUCCESS';
// export const SAVE_STAGE_FAIL = 'SAVE_STAGE_FAIL';
// export const DELETE_STAGE_SUCCESS = 'DELETE_STAGE_SUCCESS';
// export const DELETE_STAGE_FAIL = 'DELETE_STAGE_FAIL';
// export const REMOVE_STAGE = 'REMOVE_STAGE';
// export const TOGGLE_STAGE_EDITOR = 'TOGGLE_STAGE_EDITOR';
// export const CHANGE_SELECTED_STAGE = 'CHANGE_SELECTED_STAGE';

// export function stageReducer(state: GameStage = initialState, action: StageAction): GameStage {
//     switch (action.type) {
//         case ADD_STAGE:
//             return {
//                 ...state,
//                 items: {
//                     ...state.items,
//                     [action.payload.id]: action.payload
//                 },
//                 lastInsert: action.payload
//             };
//         case REMOVE_STAGE:
//             const items = { ...state.items };
//             delete items[action.payload.id];
//             return { ...state, items, lastDelete: action.payload };
//         case SET_STAGES:
//             return {
//                 ...state,
//                 items: { ...state.items, ...action.payload }
//             };
//         case TOGGLE_STAGE_EDITOR:
//             return {
//                 ...state,
//                 showEditor: action.payload
//             };
//         case CHANGE_SELECTED_STAGE:
//             return {
//                 ...state,
//                 selectedItem: action.payload
//             };
//         default:
//             return state;
//     }
// }

// const selectCurrentFeature = createSelector(selectFeature, (state: GameEditorFeature): GameStage => state.form.stages);

// export const selectStages = createSelector(selectCurrentFeature, selectGame, (state, game): Stage[] => {
//     return state.items ? Object.values(state.items).filter(elem => elem.game === game.id) : [];
// });
// export const getSelectedStage = createSelector(selectCurrentFeature, (state): Stage => state.selectedItem);
// export const selectStageById = (stageId: number) => createSelector(selectCurrentFeature, (state): Stage => state.items[stageId]);
// export const selectStageEditorState = createSelector(selectCurrentFeature, (state): boolean => state.showEditor);
