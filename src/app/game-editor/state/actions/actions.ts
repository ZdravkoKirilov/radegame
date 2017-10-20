import * as actionTypes from './actionTypes';
import {Action} from '@ngrx/store';
import {Resource, Character, Trivia} from '../../../game-mechanics/models/index';

export class UpdateFieldAction implements Action {
    constructor(public payload: {
        branch: string;
        data: {};
    }) {
    }

    readonly type = actionTypes.UPDATE_FIELD;
}

export class SaveResourceAction implements Action {
    constructor(public payload: Resource) {
    }

    readonly type = actionTypes.SAVE_RESOURCE;
}

export class SaveResourceSuccessAction implements Action {
    constructor(public payload: Resource) {
    }

    readonly type = actionTypes.SAVE_RESOURCE_SUCCESS;
}

export class SaveResourceFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.SAVE_RESOURCE_FAIL;
}

export class SaveCharacterAction implements Action {
    constructor(public payload: Character) {
    }

    readonly type = actionTypes.SAVE_CHARACTER;
}

export class SaveCharacterSuccessAction implements Action {
    constructor(public payload: Character) {
    }

    readonly type = actionTypes.SAVE_CHARACTER_SUCCESS;
}

export class SaveCharacterFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.SAVE_CHARACTER_FAIL;
}


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
    UpdateFieldAction
    | SaveResourceAction
    | SaveResourceSuccessAction
    | SaveResourceFailAction
    | SaveCharacterAction
    | SaveCharacterSuccessAction
    | SaveCharacterFailAction
    | SaveTriviaAction
    | SaveTriviaSuccessAction
    | SaveTriviaFailAction;