import { Quest, QuestCondition, QuestEffect, QUEST_CONDITION as cnd } from '@app/game-mechanics';
import { ConnectedEntities, controlTypes, BaseControl, Option } from '@app/dynamic-forms';
import { composeActivityOptions, composeFieldOptions, composeRoundOptions, composeResourceOptions, composeStageOptions } from '../helpers';

export function QUEST_DEF(data: Quest = {}, ent: ConnectedEntities): BaseControl[] {
    data = data || <Quest>{ penalty: [], condition: [], cost: [], award: [] };
    const activities = composeActivityOptions(ent);
    const fields = composeFieldOptions(ent);
    const rounds = composeRoundOptions(ent);
    const resources = composeResourceOptions(ent);
    const stages = composeStageOptions(ent);

    const conditionOptions: Option[] = Object.keys(cnd).map(key => {
        return { value: key, label: cnd[key] };
    });

    conditionOptions.sort(sortOptions);
    const conditionType = {
        name: 'type',
        controlType: controlTypes.DROPDOWN,
        label: 'Condition type',
        options: conditionOptions,
        value: ''
    };

    const cond_childTemplate: BaseControl = {
        controlType: controlTypes.NESTED_FORM,
        childControls: [
            conditionType,
            {
                controlType: controlTypes.DROPDOWN,
                label: 'Field',
                name: 'field',
                options: fields,
                toggleContext: {
                    show: {
                        field: conditionType.name,
                        value: [cnd.CLAIM_FIELD]
                    }
                }
            }, {
                controlType: controlTypes.DROPDOWN,
                label: 'Resource',
                name: 'resource',
                options: resources,
                toggleContext: {
                    show: {
                        field: conditionType.name,
                        value: [cnd.CLAIM_RESOURCE]
                    }
                }
            }, {
                controlType: controlTypes.DROPDOWN,
                label: 'Activity',
                name: 'activity',
                options: activities,
                toggleContext: {
                    show: {
                        field: conditionType.name,
                        value: [cnd.PLAY_ACTIVITY]
                    }
                }
            }, {
                controlType: controlTypes.NUMBER_INPUT,
                label: 'Amount',
                name: 'amount',
                toggleContext: {
                    show: {
                        field: conditionType.name,
                        value: [cnd.CLAIM_RESOURCE]
                    }
                }
            }, {
                controlType: controlTypes.DROPDOWN,
                label: 'By round',
                name: 'byRound',
                options: rounds,
                toggleContext: {
                    show: {
                        field: conditionType.name,
                        value: [...Object.values(cnd)]
                    }
                }
            }, {
                controlType: controlTypes.DROPDOWN,
                label: 'At round',
                name: 'atRound',
                options: rounds,
                toggleContext: {
                    show: {
                        field: conditionType.name,
                        value: [...Object.values(cnd)]
                    }
                }
            }, {
                controlType: controlTypes.DROPDOWN,
                label: 'Stage',
                name: 'stage',
                options: stages,
                toggleContext: {
                    show: {
                        field: conditionType.name,
                        value: [...Object.values(cnd)]
                    }
                }
            }],
    };

    const cond_childControls: BaseControl[] = composeQuestConditions(data.condition, cond_childTemplate);

    return [{
        controlType: controlTypes.NUMBER_INPUT,
        hidden: true,
        name: 'id',
        value: data.id,
    }, {
        name: 'name',
        controlType: controlTypes.TEXT_INPUT,
        value: data.name,
        label: 'Quest name',
        required: true
    }, {
        name: 'description',
        controlType: controlTypes.TEXT_INPUT,
        value: data.description,
        label: 'Quest description',
        required: false
    }, {
        name: 'image',
        controlType: controlTypes.IMAGE_PICKER,
        label: 'Quest image',
        required: false,
        value: data.image
    }, {
        name: 'condition',
        controlType: controlTypes.FORM_ARRAY,
        label: 'Quest condition: ',
        addButtonText: 'Add condition',
        connectedEntities: ent,
        childControls: cond_childControls,
        childTemplate: cond_childTemplate
    }, {
        name: 'cost',
        controlType: controlTypes.BUTTON_GROUP,
        label: 'Quest cost: ',
        options: activities,
        value: composeValue(data.cost),

    }, {
        name: 'award',
        controlType: controlTypes.BUTTON_GROUP,
        label: 'Quest award: ',
        options: activities,
        value: composeValue(data.award),
    }, {
        name: 'penalty',
        controlType: controlTypes.BUTTON_GROUP,
        label: 'Quest penalty: ',
        options: activities,
        value: composeValue(data.penalty),
    }
    ];
}

function composeQuestConditions(conditions: QuestCondition[], template: BaseControl): BaseControl[] {
    return conditions.map(elem => {
        const nestedForm = { ...template };
        nestedForm.childControls = nestedForm.childControls.map(child => {
            return { ...child, value: elem[child.name] };
        });
        return nestedForm;
    });
}

function composeValue(data: QuestEffect[]) {
    return data.map(elem => elem.activity);
}

function sortOptions(a: Option, b: Option) {
    if (a.label.charAt(0) > b.label.charAt(0)) {
        return 1;
    }
    if (a.label.charAt(0) < b.label.charAt(0)) {
        return -1;
    }
    return 0;
}
