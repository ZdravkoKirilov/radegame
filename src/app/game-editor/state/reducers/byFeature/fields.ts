import {Actions} from '../../actions/byFeature/fieldActions';
import * as actionTypes from '../../actions/actionTypes';
import {BoardFields} from '../../../models/index';

const defaultGridDimensions = {
    x: 3,
    y: 3
};

const initialState: BoardFields = {
    items: {},
    lastInsert: null,
    grid: Array(defaultGridDimensions.y)
        .fill(null)
        .map(elem => Array(defaultGridDimensions.x).fill(null))
};

export function fieldsReducer(state: BoardFields = initialState, action: Actions): BoardFields {
    switch (action.type) {
        case actionTypes.SAVE_FIELD_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                lastInsert: action.payload

            };
        case actionTypes.ADD_GRID_FIELD:
            const withAddedField = [...state.grid];
            withAddedField[action.payload.coords.x][action.payload.coords.y] = action.payload.data.id;
            return {
                ...state,
                grid: withAddedField
            };
        case actionTypes.REMOVE_GRID_FIELD:
            const withRemovedField = [...state.grid];
            withRemovedField[action.payload.x][action.payload.y] = null;
            return {
                ...state,
                grid: withRemovedField
            };
        case actionTypes.ADD_GRID_ROW:
            const rowWidth = state.grid[0].length || defaultGridDimensions.x;
            return {
                ...state,
                grid: [
                    ...state.grid,
                    Array(rowWidth).fill(null)
                ]
            };
        case actionTypes.ADD_GRID_COLUMN:
            const newGrid = [...state.grid].map(innerArr => {
                const newInnerArr = [...innerArr];
                newInnerArr.push(null);
                return newInnerArr;
            });
            return {
                ...state,
                grid: newGrid
            };
        case actionTypes.REMOVE_GRID_ROW:
            const withRemovedRow = [...state.grid];
            withRemovedRow.splice(action.payload, 1);
            return {
                ...state,
                grid: withRemovedRow
            };
        case actionTypes.REMOVE_GRID_COLUMN:
            const withRemovedColumns = [...state.grid].map(innerArr => {
                const newInnerArr = [...innerArr];
                newInnerArr.splice(action.payload, 1);
                return newInnerArr;
            });
            return {
                ...state,
                grid: withRemovedColumns
            };
        default:
            return state;
    }
}
