import { Actions } from '../../actions/byFeature/assetActions';
import * as actionTypes from '../../actions/actionTypes';
import { GameEditorAssets } from '../../models/index';

const initialState: GameEditorAssets = {
    supportedMovements: [],
    supportedAbilities: []
};

export function gameEditorAssetsReducer(state: GameEditorAssets = initialState, action: Actions): GameEditorAssets {
    switch (action.type) {
        case actionTypes.UPDATE_EDITOR_ASSET:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}