import { BaseControl, Option, ConnectedEntities, controlTypes } from '@app/dynamic-forms';
import { composeKeywordOptions, composeBooleanOptions, composeActionOptions } from './helpers';
import { QUOTA_TYPE, EntityWithKeywords } from '@app/game-mechanics';

export const composeQuotaTemplate = (ent: ConnectedEntities, keywordSource: EntityWithKeywords[][]): BaseControl => {

    return {
        controlType: controlTypes.NESTED_FORM,
        childControls: [
            { name: 'id', controlType: controlTypes.TEXT_INPUT, hidden: true },
            {
                name: 'activity',
                controlType: controlTypes.DROPDOWN,
                label: 'Action',
                required: true, options: composeActionOptions(ent)
            }, {
                name: 'type',
                controlType: controlTypes.DROPDOWN,
                label: 'Type',
                required: true,
                options: Object.values(QUOTA_TYPE).map(elem => ({ value: elem }))
            }, {
                name: 'filter',
                controlType: controlTypes.DROPDOWN,
                label: 'Available for',
                showImage: true,
                options: composeKeywordOptions(keywordSource)
            }, {
                name: 'amount',
                controlType: controlTypes.NUMBER_INPUT,
                label: 'Quantity',
                required: true
            }, {
                name: 'renewable',
                controlType: controlTypes.BUTTON_GROUP,
                label: 'Renewable',
                options: composeBooleanOptions(),
                defaultValue: true,
                valueField: 'renewable'
            }, {
                name: 'auto_trigger',
                controlType: controlTypes.BUTTON_GROUP,
                label: 'Auto trigger',
                options: composeBooleanOptions(),
                defaultValue: false,
                valueField: 'auto_trigger'
            }
        ]
    };
};