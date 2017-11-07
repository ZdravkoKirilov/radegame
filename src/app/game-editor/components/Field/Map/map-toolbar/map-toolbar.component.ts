import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'rg-map-toolbar',
    templateUrl: './map-toolbar.component.html',
    styleUrls: ['./map-toolbar.component.scss']
})
export class MapToolbarComponent {
    @Output() addBackground: EventEmitter<any> = new EventEmitter();
    @Output() removeBackground: EventEmitter<any> = new EventEmitter();
    @Output() addField: EventEmitter<any> = new EventEmitter();
    @Output() enterPathCreationMode: EventEmitter<any> = new EventEmitter();
    @Output() exitPathCreationMode: EventEmitter<any> = new EventEmitter();

    @Input() pathCreationMode: boolean;

    imagePickerConfig = {
        buttonColor: 'primary'
    };

    constructor() {
    }
}
