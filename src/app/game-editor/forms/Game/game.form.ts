import { BaseControl, controlTypes } from '../../../dynamic-forms';
import { Game } from '../../../game-mechanics';

export function GAME_DEF(data: Game): BaseControl[] {
    data = data || {};
    return [
        {
            name: 'title',
            controlType: controlTypes.TEXT_INPUT,
            value: data.title,
            label: 'Pick game title',
            required: true
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_PICKER,
            label: 'Game image',
            required: true,
            value: data.image,
        }
    ];
}