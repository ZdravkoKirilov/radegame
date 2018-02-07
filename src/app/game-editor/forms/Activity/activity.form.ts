import { BaseControl, Option } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import { Activity, ActivityConfig } from '../../../game-mechanics/models/Activity.model';
import { ACTIONS_MAPPING } from './sub-forms';
import { types } from '../../../game-mechanics/models/Activity.model';
import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';

export function ACTIVITY_DEF(data: Activity, ent: ConnectedEntities): BaseControl[] {
    data = data || {configs: []};
    const activityTypes: Option[] = Object.keys(ACTIONS_MAPPING).map(key => {
        return {value: key, label: ACTIONS_MAPPING[key].name};
    });
    activityTypes.sort((a, b) => {
        if (a.label.charAt(0) > b.label.charAt(0)) {
            return 1;
        }
        if (a.label.charAt(0) < b.label.charAt(0)) {
            return -1;
        }
        return 0;
    });
    const activityType = {
        name: 'type',
        controlType: controlTypes.DROPDOWN,
        label: 'Action type',
        options: activityTypes,
        value: ''
    };
    const childTemplate: BaseControl = {
        controlType: controlTypes.DYNAMIC_NESTED_FORM,
        childControls: [activityType],
        childTemplate: activityType,
        subFormMapping: ACTIONS_MAPPING
    };
    const childControls: BaseControl[] = data.configs.map((elem: ActivityConfig) => {
        const subform: FormDefinition = ACTIONS_MAPPING[elem.type].form;
        const childInstance: BaseControl = {
            ...childTemplate, childControls: [
                {
                    ...activityType,
                    value: elem.type
                },

            ]
        };
        if (subform) {
            const addedControls = subform(elem, ent);
            childInstance.childControls = childInstance.childControls.concat(addedControls);
        }
        return childInstance;
    });
    return [
        {
            name: 'name',
            controlType: controlTypes.TEXT_INPUT,
            value: data.name,
            label: 'Action name',
            required: true
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: data.description || '',
            label: 'Action description',
            required: false
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_BROWSER,
            label: 'Action featured image',
            required: true,
            value: data.image
        }, {
            name: 'configs',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Action configuration',
            addButtonText: 'Add activity',
            connectedEntities: ent,
            childControls,
            childTemplate
        }
    ];
}

