import { Action } from '@ngrx/store';
import { Round, RoundList } from '../../../../game-mechanics/models/index';
import {
    ADD_ROUND,
    CHANGE_SELECTED_ROUND,
    DELETE_ROUND,
    DELETE_ROUND_SUCCESS,
    DELETE_ROUND_FAIL,
    REMOVE_ROUND,
    SAVE_ROUND,
    SAVE_ROUND_SUCCESS,
    SAVE_ROUND_FAIL,
    SET_ROUNDS,
    TOGGLE_ROUND_EDITOR,
    GET_ROUNDS,
    GET_ROUNDS_SUCCESS,
    GET_ROUNDS_FAIL
} from '../../reducers/byFeature/round.reducer';


export class SaveRoundAction implements Action {
    constructor(public payload: Round) {
    }

    readonly type = SAVE_ROUND;
}

export class AddRoundAction implements Action {
    constructor(public payload: Round) {
    }

    readonly type = ADD_ROUND;
}

export class SaveRoundSuccessAction implements Action {
    constructor(public payload: Round) {
    }

    readonly type = SAVE_ROUND_SUCCESS;
}

export class SaveRoundFailAction implements Action {
    readonly payload = null;
    readonly type = SAVE_ROUND_FAIL;
}

export class GetRoundsAction implements Action {
    constructor(public payload: number) {
    }

    readonly type = GET_ROUNDS;
}

export class GetRoundsSuccessAction implements Action {
    readonly payload = null;
    readonly type = GET_ROUNDS_SUCCESS;
}

export class GetRoundsFailAction implements Action {
    readonly payload = null;
    readonly type = GET_ROUNDS_FAIL;
}

export class SetRoundsAction implements Action {
    constructor(public payload: RoundList) {
    }

    readonly type = SET_ROUNDS;

}

export class ToggleRoundEditorAction implements Action {
    constructor(public payload: boolean) {
    }

    readonly type = TOGGLE_ROUND_EDITOR;
}

export class ChangeSelectedRoundAction implements Action {
    constructor(public payload?: Round) {
    }

    readonly type = CHANGE_SELECTED_ROUND;
}

export class DeleteRoundAction implements Action {
    constructor(public payload: Round) {
    }

    readonly type = DELETE_ROUND;
}

export class RemoveRoundAction implements Action {
    constructor(public payload: Round) {

    }

    readonly type = REMOVE_ROUND;
}

export class DeleteRoundSuccessAction implements Action {
    constructor(public payload: Round) {
    }

    readonly type = DELETE_ROUND_SUCCESS;
}

export class DeleteRoundFailAction implements Action {
    readonly payload = null;
    readonly type = DELETE_ROUND_FAIL;
}

export type RoundAction =
    | SaveRoundAction
    | SaveRoundSuccessAction
    | SaveRoundFailAction
    | SetRoundsAction
    | ToggleRoundEditorAction
    | ChangeSelectedRoundAction
    | AddRoundAction
    | DeleteRoundAction
    | DeleteRoundSuccessAction
    | DeleteRoundFailAction
    | RemoveRoundAction
    | GetRoundsAction
    | GetRoundsSuccessAction
    | GetRoundsFailAction
    | SetRoundsAction;
