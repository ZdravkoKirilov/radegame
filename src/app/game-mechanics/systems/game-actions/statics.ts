import { FormDefinition } from '../../../shared/models/FormDefinition';

/*
action form

target:
mode:
quantity:

*/


export const types = {
    GAIN_RESOURCE: 'GAIN_RESOURCE',
    REDUCE_RESOURCE: 'REDUCE_RESOURCE',
    REDUCE_COST: 'REDUCE_COST',
    INCREASE_COST: 'INCREASE_COST'
};

export const actionModes = {
    TRIGGER: 'TRIGGER',
    PASSIVE: 'PASSIVE',
    TRAP: 'TRAP', // on field
    SECRET: 'SECRET'  // secret sabotage
};

export const targetTypes = {
    FIELD: 'FIELD',  // asks in UI
    RANDOM_FIELD: 'RANDOM_FIELD',
    RANDOM_FIELD_AND_SELF: 'RANDOM_FIELD_AND_SELF',

    PLAYER: 'PLAYER',  // asks in UI // unless mode = TRAP/SECRET
    RANDOM_PLAYER: 'RANDOM_PLAYER',
    RANDOM_PLAYER_AND_SELF: 'RANDOM_PLAYER_AND_SELF',

    SELF: 'SELF',  // automatic resolve,
    ACTIVE_FIELD: 'ACTIVE_FIELD'
};

export const quantityTypes = {  // may be unnecessary and make implicit: fixed_quantity = FIXED_NUMBER; range_max = RANDOM_NUMBER etc.
    'FIXED_NUMBER': 'FIXED_NUMBER',  // fixed_quantity
    'RANDOM_NUMBER': 'RANDOM_NUMBER',  // 0 - range_max
    'RANDOM_RANGE': 'RANDOM_RANGE'     // can support negatives // range_min - range_max
};

export const gameActions: PrivateActionList = {
    [types.GAIN_RESOURCE]: {
        id: types.GAIN_RESOURCE,
        name: 'Gain resource',
        valid_modes: [actionModes.TRIGGER, actionModes.PASSIVE],
        valid_targets: [
            targetTypes.PLAYER
        ],
        form: null
    },
    [types.REDUCE_RESOURCE]: {
        id: types.REDUCE_RESOURCE,
        name: 'Reduce resource',
        valid_modes: [actionModes.TRIGGER, actionModes.PASSIVE],
        valid_targets: [
            targetTypes.PLAYER
        ],
        form: null
    },
    [types.INCREASE_COST]: {
        id: types.INCREASE_COST,
        name: 'Increase cost',
        valid_modes: [actionModes.TRIGGER, actionModes.PASSIVE],
        valid_targets: [
            targetTypes.FIELD
        ],
        form: null
    },
    [types.REDUCE_COST]: {
        id: types.REDUCE_COST,
        name: 'Reduce cost',
        valid_modes: [actionModes.TRIGGER, actionModes.PASSIVE],
        valid_targets: [
            targetTypes.FIELD
        ],
        form: null
    }
};

export interface ActionConfig {
    [key: string]: {
        type: ActionType,
        mode: ActionMode; // from valid_modes
        target: ActionTarget;  // from valid_targets
        params: {
            resource?: number;  // id of resource
            fixed_quantity?: number;
            range_min?: number;
            range_max?: number;
        }
    };
}

export interface PrivateGameAction {
    id: string;
    name: string;
    valid_modes: ActionMode[];
    valid_targets: ActionTarget[];
    form?: FormDefinition;
}

export interface PrivateActionList {
    [key: string]: PrivateGameAction;
}

export type ActionEffectQuantityType =
    typeof quantityTypes.FIXED_NUMBER |
    typeof quantityTypes.RANDOM_NUMBER |
    typeof quantityTypes.RANDOM_RANGE;

export type ActionTarget =
    typeof targetTypes.FIELD |
    typeof targetTypes.RANDOM_FIELD |
    typeof targetTypes.RANDOM_FIELD_AND_SELF |
    typeof targetTypes.PLAYER |
    typeof targetTypes.RANDOM_PLAYER |
    typeof targetTypes.RANDOM_PLAYER_AND_SELF |
    typeof targetTypes.SELF |
    typeof targetTypes.ACTIVE_FIELD;

export type ActionMode =
    typeof actionModes.TRIGGER |
    typeof actionModes.PASSIVE |
    typeof actionModes.TRAP |
    typeof actionModes.SECRET;

export type ActionType =
    typeof types.REDUCE_RESOURCE |
    typeof types.GAIN_RESOURCE |
    typeof types.INCREASE_COST |
    typeof types.REDUCE_COST;


// to my future self: action executables: pure functions that may accept input and output array of Store FactionAction (containing computed parameters from the input)