import {Component, ViewChild, ElementRef, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

import {fabric} from 'fabric';

import {WindowRefService} from '../../../../../shared/services/window-ref.service';
import {FABRIC_CANVAS_CONFIG} from '../../../../configs/config';
import {BoardField} from '../../../../../game-mechanics/models/index';

@Component({
    selector: 'rg-map-editor',
    templateUrl: './map-editor.component.html',
    styleUrls: ['./map-editor.component.scss']
})
export class MapEditorComponent implements OnInit, OnChanges {
    @ViewChild('canvasWrapper') canvasWrapper: ElementRef;
    @ViewChild('canvas') canvas: ElementRef;
    @Output() addBackground: EventEmitter<any> = new EventEmitter();
    @Output() removeBackground: EventEmitter<any> = new EventEmitter();
    @Input() canvasImage: string;
    @Input() fields: BoardField[];
    fCanvas: any;
    showEditor = false;

    constructor(private windowRef: WindowRefService) {
    }

    showFieldEditor() {
        this.showEditor = true;
    }

    hideFieldEditor() {
        this.showEditor = false;
    }

    ngOnInit() {
        const dynamicConfig = {
            width: this.windowRef.nativeWindow.outerWidth,
            height: this.windowRef.nativeWindow.outerHeight,
        };
        this.fCanvas = new fabric.Canvas('fCanvas', FABRIC_CANVAS_CONFIG(dynamicConfig));
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.fCanvas && changes.canvasImage) {
            const fCanvas = this.fCanvas;
            const currentImage = changes.canvasImage.currentValue;
            if (currentImage) {
                fCanvas.setBackgroundImage(currentImage, function (img) {
                    fCanvas.set({
                        width: img.width,
                        height: img.height
                    });
                    fCanvas.renderAll();
                }, {
                    width: this.fCanvas.width,
                    originX: 'left',
                    originY: 'top'
                });
            } else {
                fCanvas.backgroundImage = null;
                fCanvas.setBackgroundImage('', fCanvas.renderAll.bind(fCanvas));
            }

        }
    }
}
