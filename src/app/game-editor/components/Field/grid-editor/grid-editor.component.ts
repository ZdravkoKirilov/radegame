import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Grid } from '../../../../game-mechanics/models/BoardField';
import { FieldCoord } from '../../../state/models/index';
import { BoardField } from '../../../../game-mechanics/models/index';
import { GridFieldPayload } from '../../../state/models/index';

@Component({
    selector: 'rg-grid-editor',
    templateUrl: './grid-editor.component.html',
    styleUrls: ['./grid-editor.component.scss']
})
export class GridEditorComponent {

    @Input() data: Grid;

    @Output() addRow: EventEmitter<any> = new EventEmitter();
    @Output() addColumn: EventEmitter<any> = new EventEmitter();
    @Output() removeRow: EventEmitter<number> = new EventEmitter();
    @Output() removeColumn: EventEmitter<number> = new EventEmitter();
    @Output() removeField: EventEmitter<FieldCoord> = new EventEmitter();

    public showEditor = false;
    public selectedCoord: FieldCoord;
    public selectedField: BoardField;

    constructor() {
    }

    handleEditClick(payload: GridFieldPayload) {
        this.selectedField = payload.data;
        this.selectedCoord = payload.coords;
        this.handleShowEditor();
    }

    handleCreateClick(coord: FieldCoord) {
        this.selectedField = null;
        this.selectedCoord = coord;
        this.handleShowEditor();
    }

    handleShowEditor() {
        this.showEditor = true;
    }

    handleHideEditor() {
        this.showEditor = false;
    }
}
