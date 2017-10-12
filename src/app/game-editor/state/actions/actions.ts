import actionTypes from './actionTypes';

export interface Payload  {
    branch: string;
    data: {};
}

export interface Action {
    type: string;
    payload: Payload;
}

export function updateField(payload: Payload) {
    return {
        type: actionTypes.UPDATE_FIELD,
        payload
    };
}
