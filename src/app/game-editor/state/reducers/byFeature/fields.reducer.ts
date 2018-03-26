// import { createSelector } from '@ngrx/store';

// import { FieldAction } from '../../actions';
// import { Field, FieldList } from '../../../../game-mechanics';
// import { GameEditorFeature } from '../main.reducer';
// import { selectFeature } from '../selectors';

// export interface BoardFields {
//     items?: FieldList;
//     fetchError?: boolean;
//     loading?: boolean;
//     lastInsert?: Field;
//     lastDelete?: Field;
//     showFieldEditor?: boolean;
//     selectedField?: Field;
// }

// const initialState: BoardFields = {
//     items: null,
//     lastInsert: null,
//     lastDelete: null,
//     selectedField: null,
//     showFieldEditor: false,
// };

// export const GET_FIELDS = 'GET_FIELDS';
// export const GET_FIELDS_SUCCESS = 'GET_FIELDS_SUCCESS';
// export const GET_FIELDS_FAIL = 'GET_FIELDS_FAIL';
// export const SET_FIELDS = 'SET_FIELDS';
// export const DELETE_FIELD = 'DELETE_FIELD';
// export const UPDATE_FIELD = 'UPDATE_FIELD';
// export const SAVE_FIELD = 'SAVE_FIELD';
// export const SAVE_FIELD_SUCCESS = 'SAVE_FIELD_SUCCESS';
// export const SAVE_FIELD_FAIL = 'SAVE_FIELD_FAIL';
// export const DELETE_FIELD_SUCCESS = 'DELETE_FIELD_SUCCESS';
// export const DELETE_FIELD_FAIL = 'DELETE_FIELD_FAIL';
// export const TOGGLE_FIELD_EDITOR = 'TOGGLE_FIELD_EDITOR';
// export const CHANGE_SELECTED_FIELD = 'CHANGE_SELECTED_FIELD';

// export function fieldsReducer(state: BoardFields = initialState, action: FieldAction): BoardFields {
//     switch (action.type) {
//         case SAVE_FIELD_SUCCESS:
//             const isInsert = !(action.payload.id in state.items);
//             const newState = {
//                 ...state,
//                 items: {
//                     ...state.items,
//                     [action.payload.id]: action.payload
//                 },
//             };
//             if (isInsert) {
//                 newState.lastInsert = action.payload;
//             }
//             return newState;
//         case DELETE_FIELD_SUCCESS:
//             const newItems = { ...state.items };
//             delete newItems[action.payload.id];
//             return {
//                 ...state,
//                 lastDelete: state.items[action.payload.id],
//                 items: { ...newItems }
//             };
//         case SET_FIELDS:
//             return {
//                 ...state,
//                 items: { ...state.items, ...action.payload }
//             };
//         case TOGGLE_FIELD_EDITOR:
//             return {
//                 ...state,
//                 showFieldEditor: action.payload
//             };
//         case CHANGE_SELECTED_FIELD:
//             return {
//                 ...state,
//                 selectedField: action.payload
//             };
//         default:
//             return state;
//     }
// }

// const selectCurrentFeature = createSelector(selectFeature, (state: GameEditorFeature): BoardFields => state.form.fields);

// export const selectFields = createSelector(selectCurrentFeature, (state): FieldList => state.items);
// export const selectFieldsAsArray = createSelector(selectCurrentFeature, (state): Field[] => {
//     return Object.values(state.items);
// });
// export const selectFieldsByStageId = (stageId: number) => createSelector(selectCurrentFeature, (state): Field[] => {
//     return Object.values(state.items).filter(elem => elem.stage === stageId);
// });
// export const selectFieldEditorToggleState = createSelector(selectCurrentFeature, (state): boolean => state.showFieldEditor);
// export const getSelectedField = createSelector(selectCurrentFeature, (state): Field => state.selectedField);
// export const selectLastInsertedField = createSelector(selectCurrentFeature, (state): Field => state.lastInsert);
