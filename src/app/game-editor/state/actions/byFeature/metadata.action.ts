import { Action } from '@ngrx/store';
import { GameMetadata } from '../../../../game-mechanics/models/index';
import { UPDATE_GAME_SETTINGS } from '../../reducers/byFeature/metadata.reducer';

export class UpdateFieldAction implements Action {
    constructor(public payload: {
        branch: string;
        data: GameMetadata;
    }) {
    }

    readonly type = UPDATE_GAME_SETTINGS;
}

export type MetadataAction =
    UpdateFieldAction;
