import {Component, OnInit, OnChanges, OnDestroy, SimpleChanges, Input} from '@angular/core';

import {fabric} from 'fabric';
import {BoardField, MapFieldSettings} from '../../../../../game-mechanics/models/index';

@Component({
    selector: 'rg-map-field',
    templateUrl: './map-field.component.html',
    styleUrls: ['./map-field.component.scss']
})
export class MapFieldComponent implements OnInit, OnChanges, OnDestroy {
    @Input() fCanvas: any;
    @Input() data: BoardField;
    @Input() mapFieldSettings: MapFieldSettings;
    private elem: any;

    constructor() {
    }

    ngOnInit() {
        const options = this.mapFieldSettings;
        const initialSettings = options || {
            width: 100,
            height: 100
        };
        fabric.Image.fromURL(this.data.image, (img) => {
            this.elem = img;
            this.elem.itemId = this.data.id;
            this.fCanvas.add(img);
            this.fCanvas.renderAll();
        }, initialSettings);
    }
    ngOnChanges(c: SimpleChanges) {
        this.fCanvas.renderAll();
    }
    ngOnDestroy() {
        this.fCanvas.remove(this.elem);
    }
}
