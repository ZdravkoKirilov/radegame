import * as actionTypes from './actionTypes';
import {Action} from '@ngrx/store';
import {GameMetadata} from '../../../game-mechanics/models/index';

export class UpdateFieldAction implements Action {
    constructor(public payload: {
        branch: string;
        data: GameMetadata;
    }) {
    }

    readonly type = actionTypes.UPDATE_FIELD;
}

export type Actions =
    UpdateFieldAction;
