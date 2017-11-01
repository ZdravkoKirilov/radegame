import {Map} from '../../../models/index';
import {MapActions} from '../../actions/byFeature/mapActions';
import * as actionTypes from '../../actions/actionTypes';

const initialState: Map = {
    canvas: {
        image: null
    }
};

export function mapReducer(state: Map = initialState, action: MapActions): Map {
    switch (action.type) {
        case actionTypes.UPDATE_MAP:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}