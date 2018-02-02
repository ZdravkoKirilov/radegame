import { SubFormMapping } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import {
    QUEST_CONDITIONS as conditions,
    QUEST_COSTS as costs,
    QUEST_OUTCOMES as outcomes
} from '../../../game-mechanics/systems/quest/constants';
import { QuestCondition, QuestEffect, Resource, Activity } from '../../../game-mechanics/models/index';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';
import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';
import { composeFieldOptions, composeResourceOptions, composeActivityOptions, composeRoundOptions } from '../helpers';

const questCondition_fields: FormDefinition = (data: QuestCondition, ent: ConnectedEntities) => {
    const fields = composeFieldOptions(ent);
    const rounds = composeRoundOptions(ent);

    return [
        {
            controlType: controlTypes.DROPDOWN,
            label: 'Field',
            name: 'field',
            options: fields,
            value: data.field,
        }, {
            controlType: controlTypes.DROPDOWN,
            label: 'By round',
            name: 'byRound',
            options: rounds,
            value: data.byRound,
        }, {
            controlType: controlTypes.DROPDOWN,
            label: 'At round',
            name: 'atRound',
            options: rounds,
            value: data.atRound,
        }
    ];
};

const questCondition_fields_random: FormDefinition = (data: QuestCondition, ent: ConnectedEntities) => {
    const rounds = composeRoundOptions(ent);
    return [
        {
            controlType: controlTypes.NUMBER_INPUT,
            label: 'Amount of fields',
            name: 'amount',
            value: data.amount,
        }, {
            controlType: controlTypes.DROPDOWN,
            label: 'By round',
            name: 'byRound',
            options: rounds,
            value: data.byRound,
        }, {
            controlType: controlTypes.DROPDOWN,
            label: 'At round',
            name: 'atRound',
            options: rounds,
            value: data.atRound,
        }
    ];
};

const questCondition_resource: FormDefinition = (data: QuestCondition, ent: ConnectedEntities) => {
    const resources = composeResourceOptions(ent);
    const rounds = composeRoundOptions(ent);
    return [
        {
            controlType: controlTypes.DROPDOWN,
            label: 'Resource',
            name: 'resource',
            options: resources,
            value: data.resource
        }, {
            controlType: controlTypes.NUMBER_INPUT,
            label: 'Amount',
            name: 'amount',
            value: data.amount
        }, {
            controlType: controlTypes.DROPDOWN,
            label: 'By round',
            name: 'byRound',
            options: rounds,
            value: data.byRound,
        }, {
            controlType: controlTypes.DROPDOWN,
            label: 'At round',
            name: 'atRound',
            options: rounds,
            value: data.atRound,
        }
    ];
};

const questCondition_resource_random: FormDefinition = (data: QuestCondition, ent: ConnectedEntities) => {
    const rounds = composeRoundOptions(ent);
    return [
        {
            controlType: controlTypes.NUMBER_INPUT,
            label: 'Amount',
            name: 'amount',
            value: data.amount
        }, {
            controlType: controlTypes.DROPDOWN,
            label: 'By round',
            name: 'byRound',
            options: rounds,
            value: data.byRound,
        }, {
            controlType: controlTypes.DROPDOWN,
            label: 'At round',
            name: 'atRound',
            options: rounds,
            value: data.atRound,
        }
    ];
};

const questCondition_activity: FormDefinition = (data: QuestCondition, ent: ConnectedEntities) => {
    const activities = composeActivityOptions(ent);
    const rounds = composeRoundOptions(ent);
    return [
        {
            controlType: controlTypes.DROPDOWN,
            label: 'Activity',
            name: 'activity',
            options: activities,
            value: data.activity
        }, {
            controlType: controlTypes.DROPDOWN,
            label: 'By round',
            name: 'byRound',
            options: rounds,
            value: data.byRound,
        }, {
            controlType: controlTypes.DROPDOWN,
            label: 'At round',
            name: 'atRound',
            options: rounds,
            value: data.atRound,
        }
    ];
};

const questCondition_activity_random: FormDefinition = (data: QuestCondition, ent: ConnectedEntities) => {
    const rounds = composeRoundOptions(ent);
    return [
        {
            controlType: controlTypes.NUMBER_INPUT,
            label: 'Amount',
            name: 'amount',
            value: data.amount
        }, {
            controlType: controlTypes.DROPDOWN,
            label: 'By round',
            name: 'byRound',
            options: rounds,
            value: data.byRound,
        }, {
            controlType: controlTypes.DROPDOWN,
            label: 'At round',
            name: 'atRound',
            options: rounds,
            value: data.atRound,
        }
    ];
};

export const QUEST_CONDITION_MAPPING: SubFormMapping = {
    [conditions.CLAIM_FIELD]: {
        form: questCondition_fields,
        name: 'Claim field'
    },
    [conditions.CLAIM_ANY_FIELDS]: {
        form: questCondition_fields_random,
        name: 'Claim any fields'
    },
    [conditions.DEFEND_FIELD]: {
        form: questCondition_fields,
        name: 'Defend field'
    },
    [conditions.DEFEND_ANY_FIELDS]: {
        form: questCondition_fields_random,
        name: 'Defend any fields'
    },
    [conditions.CLAIM_RESOURCE]: {
        form: questCondition_resource,
        name: 'Claim resource'
    },
    [conditions.CLAIM_ANY_RESOURCE]: {
        form: questCondition_resource_random,
        name: 'Claim any resource'
    },
    [conditions.STEAL_ACTIVITY]: {
        form: questCondition_activity,
        name: 'Steal activity'
    },
    [conditions.STEAL_ANY_ACTIVITY]: {
        form: questCondition_activity_random,
        name: 'Steal any activity'
    },
    [conditions.DISCARD_ACTIVITY]: {
        form: questCondition_activity,
        name: 'Discard activity'
    },
    [conditions.DISCARD_ANY_ACTIVITY]: {
        form: questCondition_activity_random,
        name: 'Discard any activity'
    },
    [conditions.PLAY_ACTIVITY]: {
        form: questCondition_activity,
        name: 'Play activity'
    },
    [conditions.PLAY_ANY_ACTIVITY]: {
        form: questCondition_activity_random,
        name: 'Play any activity'
    },
};
