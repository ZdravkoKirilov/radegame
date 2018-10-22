import { BaseControl, controlTypes } from '@app/dynamic-forms';
import { Game } from '@app/game-mechanics';

export function GAME_DEF(data: Game): BaseControl[] {
    data = data || {};
    return [
        {
            name: 'title',
            type: controlTypes.TEXT_INPUT,
            value: data.title,
            label: 'Pick game title',
            required: true
        }, {
            name: 'image',
            type: controlTypes.IMAGE_PICKER,
            label: 'Game image',
            required: true,
            value: data.image,
        }
    ];
}