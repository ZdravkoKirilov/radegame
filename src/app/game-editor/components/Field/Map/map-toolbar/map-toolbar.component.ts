import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Field, PathEntity } from '@app/game-mechanics';

@Component({
    selector: 'rg-map-toolbar',
    templateUrl: './map-toolbar.component.html',
    styleUrls: ['./map-toolbar.component.scss']
})
export class MapToolbarComponent {
    @Output() addBackground: EventEmitter<any> = new EventEmitter();
    @Output() removeBackground: EventEmitter<any> = new EventEmitter();
    @Output() addField: EventEmitter<any> = new EventEmitter();
    @Output() editField: EventEmitter<Field> = new EventEmitter();
    @Output() deleteField: EventEmitter<Field> = new EventEmitter();
    @Output() enterPathCreationMode: EventEmitter<any> = new EventEmitter();
    @Output() exitPathCreationMode: EventEmitter<any> = new EventEmitter();
    @Output() deletePath: EventEmitter<PathEntity> = new EventEmitter();

    @Input() pathCreationMode: boolean;
    @Input() selectedPath: PathEntity;
    @Input() selectedField: Field;
    @Input() hasBackground: boolean;

    imagePickerConfig = {
        buttonColor: 'primary',
        name: 'image',
        hideThumbnail: true
    };

    constructor() {
    }
}
