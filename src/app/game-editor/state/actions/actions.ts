import { Action } from '@ngrx/store';

import { GameTemplate } from '@app/game-mechanics';
import { actionTypes, FILL_FORM } from './actionTypes';

export class FetchGameDataAction implements Action {
    readonly type = actionTypes.FETCH_GAME_DATA;
    constructor(public payload: number) { }
}

export class FetchGameDataSuccess implements Action {
    readonly type = actionTypes.FETCH_GAME_DATA_SUCCESS;
    constructor() { }
}

export class FetchGameDataFail implements Action {
    readonly type = actionTypes.FETCH_GAME_DATA_FAIL;
    constructor() { }
}

export class FillFormAction implements Action {
    readonly type = FILL_FORM;
    constructor(public payload: GameTemplate) { }
}

export type EditorAction = FetchGameDataAction | FetchGameDataSuccess | FetchGameDataFail | FillFormAction;