import { Option, SubFormMapping } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import {
    QUEST_CONDITIONS as conditions,
    QUEST_COSTS as costs,
    QUEST_OUTCOMES as outcomes
} from '../../../game-mechanics/systems/quest/constants';
import { QuestCondition, QuestCost, QuestPenalty, Resource, BoardField, Activity } from '../../../game-mechanics/models/index';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';
import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';

const questCondition_fields: FormDefinition = (data: QuestCondition, ent: ConnectedEntities) => {
    const fields = composeFieldOptions(ent);
    return [
        {
            controlType: controlTypes.DROPDOWN,
            label: 'Field',
            name: 'field',
            options: fields,
            value: data.field,
        }
    ];
};

const questCondition_fields_random: FormDefinition = (data: QuestCondition, ent: ConnectedEntities) => {
    return [
        {
            controlType: controlTypes.NUMBER_INPUT,
            label: 'Amount of fields',
            name: 'amount',
            value: data.amount,
        }
    ];
};

const questCondition_resource: FormDefinition = (data: QuestCondition, ent: ConnectedEntities) => {
    const resources = composeResourceOptions(ent);
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
        }
    ];
};

const questCondition_resource_random: FormDefinition = (data: QuestCondition, ent: ConnectedEntities) => {
    return [
        {
            controlType: controlTypes.NUMBER_INPUT,
            label: 'Amount',
            name: 'amount',
            value: data.amount
        }
    ];
};

const questCondition_activity: FormDefinition = (data: QuestCondition, ent: ConnectedEntities) => {
    const activities = composeActivityOptions(ent);
    return [
        {
            controlType: controlTypes.DROPDOWN,
            label: 'Activity',
            name: 'action',
            options: activities,
            value: data.action
        }, {
            controlType: controlTypes.NUMBER_INPUT,
            label: 'Amount',
            name: 'amount',
            value: data.action
        }
    ];
};

const questCondition_activity_random: FormDefinition = (data: QuestCondition, ent: ConnectedEntities) => {
    return [
        {
            controlType: controlTypes.NUMBER_INPUT,
            label: 'Amount',
            name: 'amount',
            value: data.amount
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


const questCost_resource: FormDefinition = (data: QuestCost, ent: ConnectedEntities) => {
    const resources = composeResourceOptions(ent);
    return [{
        controlType: controlTypes.DROPDOWN,
        label: 'Resource',
        name: 'resource',
        options: resources,
        value: data.resource,
    }, {
        controlType: controlTypes.NUMBER_INPUT,
        label: 'Amount',
        name: 'amount',
        value: data.amount,
    }];
};

export const QUEST_COST_MAPPING: SubFormMapping = {
    [costs.RESOURCE]: {
        form: questCost_resource,
        name: 'Resource'
    }
};

const questOutcome_resource: FormDefinition = (data: QuestPenalty, ent: ConnectedEntities) => {
    const resources = composeResourceOptions(ent);
    return [{
        controlType: controlTypes.DROPDOWN,
        label: 'Resource',
        name: 'resource',
        options: resources,
        value: data.resource,
    }, {
        controlType: controlTypes.NUMBER_INPUT,
        label: 'Min amount',
        name: 'minAmount',
        value: data.minAmount
    }, {
        controlType: controlTypes.NUMBER_INPUT,
        label: 'Max amount',
        name: 'maxAmount',
        value: data.maxAmount,
    }];
};

const questOutcome_random: FormDefinition = (data: QuestPenalty, ent: ConnectedEntities) => {
    return [{
        controlType: controlTypes.NUMBER_INPUT,
        label: 'Min amount',
        name: 'minAmount',
        value: data.minAmount,
    }, {
        controlType: controlTypes.NUMBER_INPUT,
        label: 'Max amount',
        name: 'maxAmount',
        value: data.maxAmount,
    }];
};

export const QUEST_PENALTY_MAPPING: SubFormMapping = {
    [outcomes.RESOURCE]: {
        form: questOutcome_resource,
        name: 'Resource'
    },
    [outcomes.RANDOM_RESOURCE]: {
        form: questOutcome_random,
        name: 'Random resource'
    }
};

export const QUEST_AWARD_MAPPING: SubFormMapping = {
    [outcomes.RESOURCE]: {
        form: questOutcome_resource,
        name: 'Resource'
    },
    [outcomes.RANDOM_RESOURCE]: {
        form: questOutcome_random,
        name: 'Random resource'
    }
};

function composeResourceOptions(ent: ConnectedEntities): Option[] {
    return ent.resources.map((elem: Resource): Option => ({
        label: elem.name,
        value: elem.id
    }));
}

function composeFieldOptions(ent: ConnectedEntities): Option[] {
    return ent.fields.map((elem: BoardField): Option => ({
        label: elem.name,
        value: elem.id
    }));
}

function composeActivityOptions(ent: ConnectedEntities): Option[] {
    return ent.activities.map((elem: Activity): Option => ({
        label: elem.name,
        value: elem.id
    }));
}
