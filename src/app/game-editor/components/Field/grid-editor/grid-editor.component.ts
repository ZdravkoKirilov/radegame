import {Component, Input, Output, EventEmitter} from '@angular/core';

import {GridEditorChangeEvent, eventTypes} from '../../../models/GridEditor';
import { FieldCoord } from '../../../models/GridEditor';

@Component({
    selector: 'rg-grid-editor',
    templateUrl: './grid-editor.component.html',
    styleUrls: ['./grid-editor.component.scss']
})
export class GridEditorComponent {

    @Input() startFrom: { x: number, y: number } = {x: 4, y: 3};
    @Input() data: any[][] = Array(this.startFrom.y)
        .fill(null)
        .map(elem => Array(this.startFrom.x).fill(null));
    @Output() change: EventEmitter<any[][]> = new EventEmitter();
    @Output() fieldChange: EventEmitter<GridEditorChangeEvent> = new EventEmitter();
    width: any[] = Array(this.startFrom.x);
    height: any[] = Array(this.startFrom.y);

    constructor() {
    }

    handleCreate(data: {
        type: any,
        data: FieldCoord
    }): void {
        this.fieldChange.emit(data);
    }

    handleRemove(x: number, y: number): void {
        this.fieldChange.emit({
            type: eventTypes.REMOVE,
            data: {x, y}
        });
    }

    removeRow(index: number) {
        const clone = [...this.data];
        clone.splice(index, 1);
        this.data = clone;
        this.height.pop();
    }

    addRow() {
        this.height.push(null);
        this.data.push(Array(this.width.length).fill(null));
    }

    removeColumn(index: number) {
        this.data.forEach(arr => {
            arr.splice(index, 1);
        });
        this.width.pop();
    }

    addColumn() {
        this.width.push(null);
        this.data.forEach(arr => {
            arr.push(null);
        });
    }
}
