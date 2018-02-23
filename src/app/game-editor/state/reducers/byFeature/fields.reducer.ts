import { FieldAction } from '../../actions/byFeature/field.action';
import { Field, FieldList } from '../../../../game-mechanics/models/index';
import { createSelector } from '@ngrx/store';
import { GameEditorFeature } from '../index';
import { selectFeature } from '../selectors';

export interface BoardFields {
    items?: {
        [key: string]: Field
    };
    lastInsert?: Field;
    lastDelete?: Field;
    showFieldEditor?: boolean;
    selectedField?: Field;
}

const initialState: BoardFields = {
    items: null,
    lastInsert: null,
    lastDelete: null,
    selectedField: null,
    showFieldEditor: false,
};

export const GET_FIELDS = 'GET_FIELDS';
export const GET_FIELDS_SUCCESS = 'GET_FIELDS_SUCCESS';
export const GET_FIELDS_FAIL = 'GET_FIELDS_FAIL';
export const SET_FIELDS = 'SET_FIELDS';
export const DELETE_FIELD = 'DELETE_FIELD';
export const UPDATE_FIELD = 'UPDATE_FIELD';
export const SAVE_FIELD = 'SAVE_FIELD';
export const SAVE_FIELD_SUCCESS = 'SAVE_FIELD_SUCCESS';
export const SAVE_FIELD_FAIL = 'SAVE_FIELD_FAIL';
export const DELETE_FIELD_SUCCESS = 'DELETE_FIELD_SUCCESS';
export const DELETE_FIELD_FAIL = 'DELETE_FIELD_FAIL';
export const TOGGLE_FIELD_EDITOR = 'TOGGLE_FIELD_EDITOR';
export const CHANGE_SELECTED_FIELD = 'CHANGE_SELECTED_FIELD';

export function fieldsReducer(state: BoardFields = initialState, action: FieldAction): BoardFields {
    switch (action.type) {
        case SAVE_FIELD_SUCCESS:
            const isInsert = !(action.payload.id in state.items);
            const newState = {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
            };
            if (isInsert) {
                newState.lastInsert = action.payload;
            }
            return newState;
        case DELETE_FIELD_SUCCESS:
            const newItems = {...state.items};
            delete newItems[action.payload.id];
            return {
                ...state,
                lastDelete: state.items[action.payload.id],
                items: {...newItems}
            };
        case SET_FIELDS:
            return {
                ...state,
                items: action.payload
            };
        case TOGGLE_FIELD_EDITOR:
            return {
                ...state,
                showFieldEditor: action.payload
            };
        case CHANGE_SELECTED_FIELD:
            return {
                ...state,
                selectedField: action.payload
            };
        default:
            return state;
    }
}

export const selectFields = createSelector(selectFeature, (state: GameEditorFeature): FieldList => {
    return state.form.fields.items;
});
export const selectFieldsAsArray = createSelector(selectFeature, (state: GameEditorFeature): Field[] => {
    return Object.values(state.form.fields.items);
});
export const selectFieldsByStageId = (stageId: number) => createSelector(selectFeature, (state: GameEditorFeature): Field[] => {
    return Object.values(state.form.fields.items).filter(elem => elem.stage === stageId);
});
export const selectFieldEditorToggleState = createSelector(selectFeature, (state: GameEditorFeature): boolean => {
    return state.form.fields.showFieldEditor;
});
export const getSelectedField = createSelector(selectFeature, (state: GameEditorFeature): Field => {
    return state.form.fields.selectedField;
});
export const selectLastInsertedField = createSelector(selectFeature, (state: GameEditorFeature): Field => {
    return state.form.fields.lastInsert;
});
