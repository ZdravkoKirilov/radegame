import {Component, Input, Output, EventEmitter} from '@angular/core';

import {BoardField} from '../../../../game-mechanics/models/index';
import {FieldCoord} from '../../../models/FieldCoord';

@Component({
    selector: 'rg-grid-field',
    templateUrl: './grid-field.component.html',
    styleUrls: ['./grid-field.component.scss']
})
export class GridFieldComponent {
    @Input() data: BoardField;
    @Input() coords: FieldCoord;

    @Output() remove: EventEmitter<FieldCoord> = new EventEmitter();

    constructor() {
    }
}
