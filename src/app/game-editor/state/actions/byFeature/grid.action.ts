import { Action } from '@ngrx/store';
import { FieldCoord } from '../../../../game-mechanics/models/BoardField';
import {
    ADD_GRID_COLUMN,
    ADD_GRID_FIELD,
    ADD_GRID_ROW,
    REMOVE_GRID_COLUMN,
    REMOVE_GRID_FIELD,
    REMOVE_GRID_ROW
} from '../../reducers/byFeature/grid.reducer';

export class AddGridRowAction implements Action {
    readonly payload = null;
    readonly type = ADD_GRID_ROW;
}

export class AddGridColumnAction implements Action {
    readonly payload = null;
    readonly type = ADD_GRID_COLUMN;
}

export class RemoveGridRowAction implements Action {
    constructor(public payload: number) {
    }

    readonly type = REMOVE_GRID_ROW;
}

export class RemoveGridColumnAction implements Action {
    constructor(public payload: number) {
    }

    readonly type = REMOVE_GRID_COLUMN;
}

export class AddGridFieldAction implements Action {
    constructor(public payload: any) {
    }

    readonly type = ADD_GRID_FIELD;
}

export class RemoveGridFieldAction implements Action {
    constructor(public payload: FieldCoord) {
    }

    readonly type = REMOVE_GRID_FIELD;
}

export type GridAction =
    | AddGridRowAction
    | AddGridColumnAction
    | RemoveGridRowAction
    | RemoveGridColumnAction
    | AddGridFieldAction
    | RemoveGridFieldAction;
