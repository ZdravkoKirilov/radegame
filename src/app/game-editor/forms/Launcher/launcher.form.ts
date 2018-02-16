import { BaseControl, Option } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import { GameBoardList, GameBoard } from '../../../game-mechanics//models';

export function GAME_LAUNCH_DEF(boards: GameBoardList): BaseControl[] {
    const boardTypes: Option[] = Object.values(boards)
        .map((elem: GameBoard) => ({ label: elem.displayName, value: elem.id }));

    return [
        {
            name: 'title',
            controlType: controlTypes.TEXT_INPUT,
            value: '',
            label: 'Pick game title',
            required: true
        }, {
            name: 'boardType',
            controlType: controlTypes.BUTTON_GROUP,
            label: 'Pick board type',
            required: true,
            options: boardTypes
        }
    ];
}