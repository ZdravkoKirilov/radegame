import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';
import { BASIC_ACTIVITY_DEF } from './forms';
import { types } from './constants';

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

export interface SubformSchemaMapping {
    [key: string]: FormDefinition;
}

export const SUBFORM_SCHEMA_MAPPING: SubformSchemaMapping = {
    [types.ATTACK_FIELD]: BASIC_ACTIVITY_DEF,
    [types.DEFEND_FIELD]: BASIC_ACTIVITY_DEF
};