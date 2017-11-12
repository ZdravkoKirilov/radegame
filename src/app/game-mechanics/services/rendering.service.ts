import {Injectable, ElementRef} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {fabric} from 'fabric';
import {FABRIC_CANVAS_CONFIG, KEYCODES} from '../../game-editor/configs/config';
import {WindowRefService} from '../../shared/services/window-ref.service';
import {MapFieldSettings} from '../models/BoardField';
import {ICanvasDimensions, Canvas, IObjectOptions, Object} from '@types/fabric';
import {FabricObject} from '../../shared/models/FabricObject';

@Injectable()
export class RenderingService {

    private stage: Canvas;
    private canvasWrapper: ElementRef;
    public objectAdded: Subject<MapFieldSettings> = new Subject();
    public objectModified: Subject<MapFieldSettings> = new Subject();
    public objectSelected: Subject<MapFieldSettings> = new Subject();
    public objectDeselected: Subject<number> = new Subject();
    public onEnterKey: Subject<any> = new Subject();
    public onDeleteKey: Subject<any> = new Subject();

    constructor(private windowRef: WindowRefService) {
    }

    initialize(canvasId: string, wrapper: ElementRef) {
        const dynamicConfig = {
            width: this.windowRef.nativeWindow.outerWidth,
            height: this.windowRef.nativeWindow.outerHeight,
        };
        this.stage = new fabric.Canvas(canvasId, FABRIC_CANVAS_CONFIG(dynamicConfig));
        this.canvasWrapper = wrapper;
        return this;
    }

    render() {
        this.stage.renderAll();
        return this;
    }

    attachListeners() {
        let payload: MapFieldSettings;
        const {stage} = this;
        stage.on('object:added', (event) => {
            const target = (event.target as FabricObject);
            payload = {
                width: target.width,
                height: target.height,
                left: 0,
                top: 0,
                fieldId: target.fieldId
            };
            this.objectAdded.next(payload);
        });
        stage.on('object:modified', (event) => {
            const target = (event.target as FabricObject);
            const height = target.getHeight();
            const width = target.getWidth();
            payload = {
                width,
                height,
                left: target.left,
                top: target.top,
                fieldId: target.fieldId
            };
            this.objectModified.next(payload);
        });

        stage.on('object:selected', (event) => {
            const target = (event.target as FabricObject);
            payload = {
                width: target.getWidth(),
                height: target.getHeight(),
                left: target.left,
                top: target.top,
                fieldId: target.fieldId
            };
            this.objectSelected.next(payload);
        });

        stage.on('selection:cleared', () => {
            this.objectDeselected.next(null);
        });

        this.canvasWrapper.nativeElement.addEventListener('keydown', (event) => {
            const activeObject = this.activeObject;

            if (event.keyCode === KEYCODES.Enter) {
                this.onEnterKey.next(activeObject);
            }
            if (event.keyCode === KEYCODES.Delete) {
                this.onDeleteKey.next(activeObject);
            }

        });
    }

    createImage(imageSrc: any, opts: IObjectOptions): Promise<FabricObject> {
        return new Promise((resolve, reject) => {
            const image: HTMLImageElement = document.createElement('img');
            image.src = imageSrc;
            image.onload = () => {
                const imgElem = new fabric.Image(image, opts);
                resolve(imgElem);
            };
            image.onerror = (err: ErrorEvent) => {
                reject(err);
            };
        });
    }

    removeObject(obj: FabricObject) {
        this.stage.remove(obj);
        this.render();
    }

    addObject(obj: Object) {
        this.stage.add(obj);
        this.render();
    }

    updateBackground(image) {
        if (image) {
            this.addBackground(image);
        } else {
            this.removeBackground();
        }
    }

    addBackground(image) {
        const {stage} = this;
        if (stage) {
            stage.backgroundImage = null;
            stage
                .setBackgroundImage('', stage.renderAll.bind(stage))
                .setBackgroundImage(image, (img) => {
                    this.setDimensions({
                        width: img.width, height: img.height
                    });
                }, {
                    originX: 'left',
                    originY: 'top'
                });
        }
        return this;
    }

    removeBackground() {
        const {stage} = this;
        if (stage) {
            stage.backgroundImage = null;
            stage.setBackgroundImage('', () => {
                this.render();
            });
        }
        return this;
    }

    setDimensions(d: ICanvasDimensions) {
        this.stage.setDimensions(d);
        this.render();
        return this;
    }

    get activeObject() {
        if (this.stage) {
            return this.stage.getActiveObject();
        }
        return null;
    }

}
