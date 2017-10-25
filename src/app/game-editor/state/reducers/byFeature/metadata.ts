import { GameMetadata } from '../../../../game-mechanics/models/index';
import {Actions} from '../../actions/byFeature/metadataActions';
import * as actionTypes from '../../actions/actionTypes';

const initialState: GameMetadata = {};

export function metadataReducer(state: GameMetadata = initialState, action: Actions): GameMetadata {
    switch (action.type) {
        case actionTypes.UPDATE_FIELD:
            return {
                ...state,
                ...action.payload.data
            };
        default:
            return state;
    }
}
