import { GridAction } from '../../actions/byFeature/grid.action';
import { createSelector } from '@ngrx/store';
import { GameEditorFeature } from '../index';
import { selectFeature } from '../selectors';
import { selectFields } from './fields.reducer';
import { BoardFieldList, Grid } from '../../../../game-mechanics/models/index';

const defaultGridDimensions = {
    x: 3,
    y: 3
};

const initialState: Grid = {
    matrix: Array(defaultGridDimensions.y)
        .fill(null)
        .map(elem => Array(defaultGridDimensions.x).fill(null))
};

export const ADD_GRID_FIELD = 'ADD_GRID_FIELD';
export const REMOVE_GRID_FIELD = 'REMOVE_GRID_FIELD';
export const ADD_GRID_ROW = 'ADD_GRID_ROW';
export const ADD_GRID_COLUMN = 'ADD_GRID_COLUMN';
export const REMOVE_GRID_ROW = 'REMOVE_GRID_ROW';
export const REMOVE_GRID_COLUMN = 'REMOVE_GRID_COLUMN';

export function gridReducer(state: Grid = initialState, action: GridAction): Grid {
    switch (action.type) {

        case ADD_GRID_FIELD:
            const withAddedField = [...state.matrix];
            withAddedField[action.payload.coords.x][action.payload.coords.y] = action.payload.data.id;
            return {
                ...state,
                matrix: withAddedField
            };
        case REMOVE_GRID_FIELD:
            const withRemovedField = [...state.matrix];
            withRemovedField[action.payload.x][action.payload.y] = null;
            return {
                ...state,
                matrix: withRemovedField
            };
        case ADD_GRID_ROW:
            const rowWidth = state[0].length || defaultGridDimensions.x;
            return {
                ...state,
                matrix: [
                    ...state.matrix,
                    Array(rowWidth).fill(null)
                ]
            };
        case ADD_GRID_COLUMN:
            const newGrid = [...state.matrix].map(innerArr => {
                const newInnerArr = [...innerArr];
                newInnerArr.push(null);
                return newInnerArr;
            });
            return {
                ...state,
                matrix: newGrid
            };
        case REMOVE_GRID_ROW:
            const withRemovedRow = [...state.matrix];
            withRemovedRow.splice(action.payload, 1);
            return {
                ...state,
                matrix: withRemovedRow
            };
        case REMOVE_GRID_COLUMN:
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

export const selectFieldsGrid = createSelector(selectFeature, (state: GameEditorFeature) => {
    return state.form.grid;
});
export const selectGridWithInnerItems = createSelector(selectFieldsGrid, selectFields, (grid: Grid, items: BoardFieldList) => {
    return [...grid.matrix].map(innerArr => {
        return [...innerArr].map(elem => {
            return items[elem] || null;
        });
    });
});

