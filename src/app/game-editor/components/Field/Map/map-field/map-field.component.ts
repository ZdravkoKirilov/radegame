import {Component, Input, OnInit} from '@angular/core';

import {fabric} from 'fabric';

@Component({
    selector: 'rg-map-field',
    templateUrl: './map-field.component.html',
    styleUrls: ['./map-field.component.scss']
})
export class MapFieldComponent implements OnInit {
    @Input() fCanvas: any;
    @Input() image: string;
    private fObject: any;

    constructor() {
    }

    ngOnInit() {
        fabric.Image.fromURL(this.image, (img) => {
            this.fObject = img;
            this.fCanvas.add(img);
        }, {
            width: 100,
            height: 100
        });


    }
}
