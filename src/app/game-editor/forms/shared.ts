import { BaseControl, Option, ConnectedEntities, controlTypes } from '@app/dynamic-forms';
import { composeKeywordOptions, composeBooleanOptions, composeActionOptions } from './helpers';
import { QUOTA_TYPE, EntityWithKeywords } from '@app/game-mechanics';

export const composeQuotaTemplate = (ent: ConnectedEntities, keywordSource: EntityWithKeywords[][]): BaseControl => {

    return {
        type: controlTypes.FORM,
        children: [
            { name: 'id', type: controlTypes.TEXT_INPUT, hidden: true },
            {
                name: 'activity',
                type: controlTypes.DROPDOWN,
                label: 'Action',
                required: true, options: composeActionOptions(ent)
            }, {
                name: 'type',
                type: controlTypes.DROPDOWN,
                label: 'Type',
                required: true,
                options: Object.values(QUOTA_TYPE).map(elem => ({ value: elem }))
            }, {
                name: 'filter',
                type: controlTypes.DROPDOWN,
                label: 'Available for',
                showImage: true,
                options: composeKeywordOptions(keywordSource)
            }, {
                name: 'amount',
                type: controlTypes.NUMBER_INPUT,
                label: 'Quantity',
                required: true
            }, {
                name: 'renewable',
                type: controlTypes.BUTTON_GROUP,
                label: 'Renewable',
                options: composeBooleanOptions(),
                defaultValue: true,
                valueField: 'renewable'
            }, {
                name: 'auto_trigger',
                type: controlTypes.BUTTON_GROUP,
                label: 'Auto trigger',
                options: composeBooleanOptions(),
                defaultValue: false,
                valueField: 'auto_trigger'
            }
        ]
    };
};