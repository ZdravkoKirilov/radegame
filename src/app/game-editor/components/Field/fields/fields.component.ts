import {Component, Input} from '@angular/core';
import { types as boardTypes } from '../../../../game-mechanics/configs/game-boards';

@Component({
    selector: 'rg-fields',
    templateUrl: './fields.component.html',
    styleUrls: ['./fields.component.scss']
})
export class FieldsComponent {
    @Input() boardType: string;
    types = boardTypes;
    constructor() {
    }
}
