import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BoardField, MapPath } from '../../../../../game-mechanics/models';

@Component({
    selector: 'rg-map-toolbar',
    templateUrl: './map-toolbar.component.html',
    styleUrls: ['./map-toolbar.component.scss']
})
export class MapToolbarComponent {
    @Output() addBackground: EventEmitter<any> = new EventEmitter();
    @Output() removeBackground: EventEmitter<any> = new EventEmitter();
    @Output() addField: EventEmitter<any> = new EventEmitter();
    @Output() editField: EventEmitter<BoardField> = new EventEmitter();
    @Output() deleteField: EventEmitter<BoardField> = new EventEmitter();
    @Output() enterPathCreationMode: EventEmitter<any> = new EventEmitter();
    @Output() exitPathCreationMode: EventEmitter<any> = new EventEmitter();
    @Output() deletePath: EventEmitter<MapPath> = new EventEmitter();

    @Input() pathCreationMode: boolean;
    @Input() selectedPath: MapPath;
    @Input() selectedField: BoardField;
    @Input() hasBackground: boolean;

    imagePickerConfig = {
        buttonColor: 'primary'
    };

    constructor() {
    }
}
