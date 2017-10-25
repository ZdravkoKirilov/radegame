import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FieldCoord} from '../../../models/FieldCoord';

@Component({
    selector: 'rg-empty-item',
    templateUrl: './empty-slot.component.html',
    styleUrls: ['./empty-slot.component.scss']
})
export class EmptySlotComponent {
    @Output() create: EventEmitter<FieldCoord> = new EventEmitter();
    @Input() coords: FieldCoord;

    constructor() {
    }

    handleCreate(): void {
        this.create.emit(this.coords);
    }
}
