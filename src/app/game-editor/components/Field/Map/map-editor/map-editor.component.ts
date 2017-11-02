import {
    Component, ViewChild, ElementRef,
    OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';

import {fabric} from 'fabric';

import {WindowRefService} from '../../../../../shared/services/window-ref.service';
import {FABRIC_CANVAS_CONFIG, KEYCODES} from '../../../../configs/config';
import {BoardField, MapFieldSettings} from '../../../../../game-mechanics/models/index';

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
    @Output() saveMapCoords: EventEmitter<MapFieldSettings> = new EventEmitter();
    @Output() deleteMapField: EventEmitter<BoardField> = new EventEmitter();
    @Input() canvasImage: string;
    @Input() fields: BoardField[];
    @Input() canvasItems: { [key: string]: MapFieldSettings } = {};
    activeObject: any;
    line: any;
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

    assignListeners() {
        let payload: MapFieldSettings;
        this.fCanvas.on('object:added', ({target}) => {
            payload = {
                width: target.width,
                height: target.height,
                left: 0,
                top: 0,
                fieldId: target.itemId
            };
            this.saveMapCoords.emit(payload);
        });
        this.fCanvas.on('object:modified', ({target}) => {
            const height = target.getHeight();
            const width = target.getWidth();
            payload = {
                width,
                height,
                left: target.left,
                top: target.top,
                fieldId: target.itemId
            };
            this.saveMapCoords.emit(payload);
        });

        this.fCanvas.on('object:selected', ({target}) => {
            if (!this.line) {
                const x1 = target.left - (target.getWidth() / 2);
                const x2 = target.left + 200;
                const y1 = target.top + (target.getHeight() / 2);
                const y2 = y1;
                const lineCoords = [x1, y1, x2, y2];
                this.line = new fabric.Line(lineCoords, {
                    fill: 'gray',
                    stroke: 'gray',
                    strokeWidth: 5,
                    opacity: .5
                });
                this.fCanvas.add(this.line);
                this.fCanvas.sendToBack(this.line);
            }
        });

        this.fCanvas.on('object:deselected', ({target}) => {
            this.fCanvas.remove(this.line);
        });

        this.canvasWrapper.nativeElement.addEventListener('keydown', (event) => {
            const activeObject = this.fCanvas.getActiveObject();
            if (activeObject) {
                this.activeObject = this.fields
                    .filter(elem => elem.id === activeObject.itemId)[0];
                if (event.keyCode === KEYCODES.Enter) {
                    this.showFieldEditor();
                }
                if (event.keyCode === KEYCODES.Delete) {
                    this.deleteMapField.emit({...this.activeObject});
                    this.activeObject = null;

                    if (activeObject.type === 'line') {
                        this.fCanvas.remove(activeObject);
                        this.line = null;
                    }
                }
            }
        });
    }

    ngOnInit() {
        const dynamicConfig = {
            width: this.windowRef.nativeWindow.outerWidth,
            height: this.windowRef.nativeWindow.outerHeight,
        };
        this.fCanvas = new fabric.Canvas('fCanvas', FABRIC_CANVAS_CONFIG(dynamicConfig));
        this.assignListeners();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.fCanvas && changes.canvasImage) {
            const fCanvas = this.fCanvas;
            const currentImage = changes.canvasImage.currentValue;
            if (currentImage) {
                fCanvas.backgroundImage = null;
                fCanvas.setBackgroundImage('', fCanvas.renderAll.bind(fCanvas));
                fCanvas.setBackgroundImage(currentImage, function (img) {
                    fCanvas.setDimensions({
                        width: img.width,
                        height: img.height
                    });
                    fCanvas.renderAll();
                }, {
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
