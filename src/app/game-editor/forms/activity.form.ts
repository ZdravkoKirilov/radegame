import { BaseControl, Option } from '../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../dynamic-forms/config/controlTypes';
import { Activity } from '../../game-mechanics/models/Activity.model';
import { SUBFORM_SCHEMA_MAPPING } from '../../game-mechanics/systems/activity/statics';
import { types } from '../../game-mechanics/systems/activity/statics';

export function ACTIVITY_DEF(data: Activity = {}): BaseControl[] {
    const activityTypes: Option[] = [
        {
            value: types.ATTACK_FIELD,
            label: 'Attack field'
        }, {
            value: types.DEFEND_FIELD,
            label: 'Defend field'
        }
    ];
    const activityType = {
        name: 'type',
        controlType: controlTypes.DROPDOWN,
        label: 'Action type',
        options: activityTypes,
        value: ''
    };
    const childControls: BaseControl[] = [];
    const childTemplate: BaseControl = {
        controlType: controlTypes.DYNAMIC_NESTED_FORM,
        childControls: [activityType],
        childTemplate: activityType,
        subFormMapping: SUBFORM_SCHEMA_MAPPING
    };
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
            value: data.description,
            label: 'Action description',
            required: false
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_BROWSER,
            label: 'Action featured image',
            required: true,
            value: data.image
        }, {
            name: 'config',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Action configuration',
            addButtonText: 'Add action',
            childControls,
            childTemplate
        }
    ];
}
