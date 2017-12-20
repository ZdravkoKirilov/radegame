import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';
import { BASIC_ACTIVITY_DEF } from './forms';
/*
action form

target:
mode:
quantity:

*/


export const types = {
    ATTACK_FIELD: 'ATTACK_FIELD',
    DEFEND_FIELD: 'DEFEND_FIELD',
    MINE_RESOURCES: 'MINE_RESOURCES',
};

export const actionModes = {
    TRIGGER: 'TRIGGER',
};

export const targetTypes = {
    FIELD: 'FIELD',  // asks in UI
};

export type ActivityTarget =
    typeof targetTypes.FIELD;

export type ActivityMode =
    typeof actionModes.TRIGGER;

export type ActivityType =
    typeof types.ATTACK_FIELD |
    typeof types.DEFEND_FIELD |
    typeof types.MINE_RESOURCES;


// PRIVATE ACTION LIST START //
export interface PrivateActivity {
    id: string;
    name: string;
    form?: FormDefinition;
}

export interface PrivateActivityList {
    [key: string]: PrivateActivity;
}

export const gameActions: PrivateActivityList = {
    [types.ATTACK_FIELD]: { // PrivateActivity
        id: types.ATTACK_FIELD,
        name: 'Attack field',
        form: BASIC_ACTIVITY_DEF
    },
    [types.DEFEND_FIELD]: {
        id: types.DEFEND_FIELD,
        name: 'Defend field',
        form: BASIC_ACTIVITY_DEF
    },
    [types.MINE_RESOURCES]: {
        id: types.MINE_RESOURCES,
        name: 'Mine resources',
        form: BASIC_ACTIVITY_DEF
    },
};

export const SUBFORM_SCHEMA_MAPPING = {
    [types.ATTACK_FIELD]: BASIC_ACTIVITY_DEF,
    [types.DEFEND_FIELD]: BASIC_ACTIVITY_DEF
};

// PRIVATE ACTION LIST END//


export interface ActivityConfig {  // WHAT IS ACTUALLY SAVED IN THE DB
    [key: string]: {
        type: ActivityType,
        mode: ActivityMode; // from valid_modes
        target: ActivityTarget;  // from valid_targets
        params: ActivityConfigParams
    };
}

export interface ActivityConfigParams {
    bonus?: number;
}


// to my future self: action executables: pure functions that may accept input and output array of Store FactionAction (containing computed parameters from the input)