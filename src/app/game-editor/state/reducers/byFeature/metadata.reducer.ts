import { GameMetadata } from '../../../../game-mechanics/models/index';
import { MetadataAction } from '../../actions/byFeature/metadata.action';

const initialState: GameMetadata = {};

export const UPDATE_GAME_SETTINGS = 'UPDATE_GAME_SETTINGS';

export function metadataReducer(state: GameMetadata = initialState, action: MetadataAction): GameMetadata {
    switch (action.type) {
        case UPDATE_GAME_SETTINGS:
            return {
                ...state,
                ...action.payload.data
            };
        default:
            return state;
    }
}
