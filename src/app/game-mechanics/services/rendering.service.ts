import {Injectable, ElementRef} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {fabric} from 'fabric';
import {FABRIC_CANVAS_CONFIG, KEYCODES} from '../../game-editor/configs/config';
import {WindowRefService} from '../../shared/services/window-ref.service';
import {MapLocation} from '../models/index';
import {ICanvasDimensions, Canvas, IObjectOptions, Object, StaticCanvas} from '@types/fabric';
import {FabricObject} from '../../shared/models/FabricObject';

@Injectable()
export class RenderingService {

    private stage: Canvas;
    private canvasWrapper: ElementRef;
    private background: StaticCanvas;
    public objectAdded: Subject<MapLocation> = new Subject();
    public objectModified: Subject<MapLocation> = new Subject();
    public objectSelected: Subject<MapLocation> = new Subject();
    public objectDeselected: Subject<number> = new Subject();
    public pathSelected: Subject<number> = new Subject();
    public pathDeselected: Subject<any> = new Subject();
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
        let payload: MapLocation;
        const {stage} = this;
        stage.on('object:added', (event) => {
            const target = (event.target as FabricObject);
            payload = {
                width: target.width,
                height: target.height,
                left: 0,
                top: 0,
                field: target.field
            };
            this.objectAdded.next(payload);
        });
        stage.on('object:modified', (event) => {
            const target = (event.target as FabricObject);
            const height = target.getHeight();
            const width = target.getWidth();
            const left = target.left;
            const top = target.top;
            payload = {
                width: parseInt((width as any), 10),
                height: parseInt((height as any), 10),
                left: parseInt((left as any), 10),
                top: parseInt((top as any), 10),
                field: target.field,
                game: target.game,
                id: target.id
            };
            this.objectModified.next(payload);
        });

        stage.on('object:selected', (event) => {
            const target = (event.target as FabricObject);
            if (target.type === 'line') {
                this.pathSelected.next(target.id);
            } else {
                const height = target.getHeight();
                const width = target.getWidth();
                const left = target.left;
                const top = target.top;
                payload = {
                    width: parseInt((width as any), 10),
                    height: parseInt((height as any), 10),
                    left: parseInt((left as any), 10),
                    top: parseInt((top as any), 10),
                    field: target.field,
                    game: target.game,
                    id: target.id
                };
                this.objectSelected.next(payload);
            }
        });

        stage.on('selection:cleared', () => {
            this.pathDeselected.next(null);
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

    createPath(coords: number[] = [250, 125, 350, 475]) {
        return new Promise((resolve, reject) => {
            try {
                const elem = new fabric.Line(coords, {
                    fill: '',
                    stroke: 'lightblue',
                    strokeWidth: 5,
                    hasControls: false,
                    lockMovementX: true,
                    lockMovementY: true,
                    opacity: .7
                });
                resolve(elem);
            } catch (err) {
                reject(err);
            }
        });
    }

    createImage(imageSrc: any, opts: IObjectOptions = {}): Promise<FabricObject> {
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

    calculatePathCoords(from: MapLocation, to: MapLocation): any {
        let x1, x2, y1, y2;

        x1 = from.left + from.width / 2;
        y1 = from.top + from.height / 2;
        x2 = to.left + to.width / 2;
        y2 = to.top + to.height / 2;
        return {x1, x2, y2, y1};
    }

    sendToBack(elem: FabricObject) {
        if (elem) {
            elem.sendToBack();
        }
    }

    sendBackwards(elem: FabricObject) {
        if (elem) {
            elem.sendBackwards();
        }
    }

    bringForward(elem: FabricObject) {
        if (elem) {
            elem.bringForward();
        }
    }

    removeObject(obj: FabricObject) {
        this.stage.remove(obj);
        this.render();
    }

    addObject(obj: Object) {
        this.stage.add(obj);
        this.render();
    }

    updateObject(obj: Object, opts: IObjectOptions = {}) {
        const data = {...opts};
        if ('width' in data) {
            obj.setWidth(data.width);
            delete data.width;
        }
        if ('height' in data) {
            obj.setHeight(data.height);
            delete data.height;
        }
        obj.set(data);
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
                .setBackgroundImage('', stage.renderAll.bind(stage));
            this.background = stage.setBackgroundImage(image, (img) => {
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
