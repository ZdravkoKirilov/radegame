import { BaseControl, Option, SubFormMapping } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import {
    QUEST_CONDITIONS as conditions,
    QUEST_AWARDS as awards,
    QUEST_COSTS as costs,
    QUEST_PENALTIES as penalties
} from '../../../game-mechanics/systems/quest/constants';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';

export const QUEST_CONDITION_MAPPING: SubFormMapping = {
    [conditions.CLAIM_FIELDS]: {
        form: null,
        name: 'Claim fields'
    }
};

export const QUEST_COST_MAPPING: SubFormMapping = {
    [costs.RESOURCE]: {
        form: null,
        name: 'Resource'
    }
};

export const QUEST_AWARD_MAPPING: SubFormMapping = {
    [awards.RESOURCE]: {
        form: null,
        name: 'Resource'
    }
};

export const QUEST_PENALTY_MAPPING: SubFormMapping = {
    [penalties.RESOURCE]: {
        form: null,
        name: 'Resource'
    }
};
