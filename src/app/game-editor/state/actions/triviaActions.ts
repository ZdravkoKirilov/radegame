import * as actionTypes from './actionTypes';
import {Action} from '@ngrx/store';
import {Trivia} from '../../../game-mechanics/models/index';

export class SaveTriviaAction implements Action {
    constructor(public payload: Trivia) {
    }

    readonly type = actionTypes.SAVE_TRIVIA;
}

export class SaveTriviaSuccessAction implements Action {
    constructor(public payload: Trivia) {
    }

    readonly type = actionTypes.SAVE_TRIVIA_SUCCESS;
}

export class SaveTriviaFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.SAVE_TRIVIA_FAIL;
}

export type Actions =
    | SaveTriviaAction
    | SaveTriviaSuccessAction
    | SaveTriviaFailAction;
