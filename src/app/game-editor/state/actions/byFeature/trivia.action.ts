import { Action } from '@ngrx/store';
import { Trivia } from '../../../../game-mechanics/models/index';
import { SAVE_TRIVIA, SAVE_TRIVIA_FAIL, SAVE_TRIVIA_SUCCESS } from '../../reducers/byFeature/trivia.reducer';

export class SaveTriviaAction implements Action {
    constructor(public payload: Trivia) {
    }

    readonly type = SAVE_TRIVIA;
}

export class SaveTriviaSuccessAction implements Action {
    constructor(public payload: Trivia) {
    }

    readonly type = SAVE_TRIVIA_SUCCESS;
}

export class SaveTriviaFailAction implements Action {
    readonly payload = null;
    readonly type = SAVE_TRIVIA_FAIL;
}

export type TriviaAction =
    | SaveTriviaAction
    | SaveTriviaSuccessAction
    | SaveTriviaFailAction;
