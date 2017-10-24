import {Component, Input, Output, EventEmitter} from '@angular/core';

import {GridEditorChangeEvent, eventTypes} from '../../../models/GridEditor';
import { FieldCoord } from '../../../models/GridEditor';

@Component({
    selector: 'rg-empty-item',
    templateUrl: './empty-slot.component.html',
    styleUrls: ['./empty-slot.component.scss']
})
export class EmptySlotComponent {
    @Output() change: EventEmitter<GridEditorChangeEvent> = new EventEmitter();
    @Input() coords: FieldCoord;

    constructor() {
    }

    handleCreate(x: number, y: number): void {
        this.change.emit({
            type: eventTypes.CREATE,
            data: this.coords
        });
    }
}
