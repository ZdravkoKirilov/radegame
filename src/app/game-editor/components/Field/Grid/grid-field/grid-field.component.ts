import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BoardField } from '../../../../../game-mechanics/models/index';
import { FieldCoord } from '../../../../models/index';
import { GridFieldPayload } from '../../../../models/index';

@Component({
    selector: 'rg-grid-field',
    templateUrl: './grid-field.component.html',
    styleUrls: ['./grid-field.component.scss']
})
export class GridFieldComponent {
    @Input() data: BoardField;
    @Input() coords: FieldCoord;

    @Output() remove: EventEmitter<FieldCoord> = new EventEmitter();
    @Output() edit: EventEmitter<GridFieldPayload> = new EventEmitter();

    handleEditClick() {
        const payload: GridFieldPayload = {
            coords: this.coords,
            data: this.data
        };
        this.edit.emit(payload);
    }
    constructor() {
    }
}
