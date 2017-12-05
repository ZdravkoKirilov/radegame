import {Actions} from '../../actions/byFeature/launcherActions';
import * as actionTypes from '../../actions/actionTypes';
import {GamesList} from '../../../models/index';
import {Game} from '../../../../game-mechanics/models/index';

const initialState: GamesList = {
    items: {},
    lastInsert: null
};

export function gamesReducer(state: GamesList = initialState, action: Actions): GamesList {
    switch (action.type) {
        case actionTypes.CREATE_GAME_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.title]: action.payload
                },
                lastInsert: action.payload

            };
        case actionTypes.SET_GAMES:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}