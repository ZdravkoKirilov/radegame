import {Actions} from '../../actions/byFeature/gridActions';
import * as actionTypes from '../../actions/actionTypes';
import {Grid} from '../../../../game-mechanics/models/index';

const defaultGridDimensions = {
    x: 3,
    y: 3
};

const initialState: Grid = {
    matrix: Array(defaultGridDimensions.y)
        .fill(null)
        .map(elem => Array(defaultGridDimensions.x).fill(null))
};

export function gridReducer(state: Grid = initialState, action: Actions): Grid {
    switch (action.type) {

        case actionTypes.ADD_GRID_FIELD:
            const withAddedField = [...state.matrix];
            withAddedField[action.payload.coords.x][action.payload.coords.y] = action.payload.data.id;
            return {
                ...state,
                matrix: withAddedField
            };
        case actionTypes.REMOVE_GRID_FIELD:
            const withRemovedField = [...state.matrix];
            withRemovedField[action.payload.x][action.payload.y] = null;
            return {
                ...state,
                matrix: withRemovedField
            };
        case actionTypes.ADD_GRID_ROW:
            const rowWidth = state[0].length || defaultGridDimensions.x;
            return {
                ...state,
                matrix: [
                    ...state.matrix,
                    Array(rowWidth).fill(null)
                ]
            };
        case actionTypes.ADD_GRID_COLUMN:
            const newGrid = [...state.matrix].map(innerArr => {
                const newInnerArr = [...innerArr];
                newInnerArr.push(null);
                return newInnerArr;
            });
            return {
                ...state,
                matrix: newGrid
            };
        case actionTypes.REMOVE_GRID_ROW:
            const withRemovedRow = [...state.matrix];
            withRemovedRow.splice(action.payload, 1);
            return {
                ...state,
                matrix: withRemovedRow
            };
        case actionTypes.REMOVE_GRID_COLUMN:
            const withRemovedColumns = [...state.matrix].map(innerArr => {
                const newInnerArr = [...innerArr];
                newInnerArr.splice(action.payload, 1);
                return newInnerArr;
            });
            return {
                ...state,
                matrix: withRemovedColumns
            };
        default:
            return state;
    }
}
