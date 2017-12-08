import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BoardField } from '../../../../../game-mechanics/models/index';
import { FieldCoord } from '../../../../../game-mechanics/models/BoardField';

@Component({
    selector: 'rg-grid-field',
    templateUrl: './grid-field.component.html',
    styleUrls: ['./grid-field.component.scss']
})
export class GridFieldComponent {
    @Input() data: BoardField;
    @Input() coords: FieldCoord;

    @Output() remove: EventEmitter<FieldCoord> = new EventEmitter();
    @Output() edit: EventEmitter<any> = new EventEmitter();

    handleEditClick() {
        const payload: any = {
            coords: this.coords,
            data: this.data
        };
        this.edit.emit(payload);
    }
    constructor() {
    }
}
