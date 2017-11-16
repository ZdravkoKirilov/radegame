import {Injectable, ElementRef} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {fabric} from 'fabric';
import {FABRIC_CANVAS_CONFIG, KEYCODES} from '../../game-editor/configs/config';
import {WindowRefService} from '../../shared/services/window-ref.service';
import {MapLocation} from '../models/index';
import {ICanvasDimensions, Canvas, IObjectOptions, Object, StaticCanvas} from '@types/fabric';
import {FabricObject, FabricObjectData} from '../../shared/models/FabricObject';

@Injectable()
export class RenderingService {

    private stage: Canvas;
    private canvasWrapper: ElementRef;
    private background: StaticCanvas;
    private nodes: { [key: string]: FabricObject };
    private paths: { [key: string]: FabricObject };

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
        this.nodes = {};
        this.paths = {};
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
                field: target.data.field
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
                field: target.data.field,
                game: target.data.game,
                id: target.data.id
            };
            this.objectModified.next(payload);
        });

        stage.on('object:selected', (event) => {
            const target = (event.target as FabricObject);
            if (target.type === 'line') {
                this.pathSelected.next(target.data.id);
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
                    field: target.data.field,
                    game: target.data.game,
                    id: target.data.id
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

        stage.on('object:moving', (event) => {
            const target = (event.target as FabricObject);
            if (target.type !== 'line') {
                const paths = target.data.paths;
                paths.forEach((id: number) => {
                    const path = this.paths[id];
                    const from = this.nodes[path.data.from];
                    const to = this.nodes[path.data.to];
                    const newPathCoords = this.calculatePathCoords(from, to);
                    this.updateObject(path, newPathCoords);
                });
            }
        });
    }

    createPath(coords: number[], data?: FabricObjectData): FabricObject {
        const elem = new fabric.Line(coords, {
            fill: '',
            stroke: 'lightblue',
            strokeWidth: 5,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true,
            opacity: .7
        });
        if (data) {
            elem.data = data;
            this.paths[data.id] = elem;
            this.addPathToNodes(data);
        }
        return elem;
    }

    addPathToNodes(data: FabricObjectData) {
        const from = this.nodes[data.from];
        const to = this.nodes[data.to];
        from.data.paths.add(data.id);
        to.data.paths.add(data.id);
    }

    createNode(imageSrc: any, opts: IObjectOptions = {}, data: FabricObjectData): FabricObject {
        const groupOptions = {
            left: opts.left,
            top: opts.top,
            width: opts.width,
            height: opts.height
        };
        const group = new fabric.Group([], groupOptions);
        group.data = data;
        this.nodes[data.id] = group;

        const image: HTMLImageElement = document.createElement('img');
        image.src = imageSrc;
        image.onload = () => {
            const options: IObjectOptions = {
                originX: 'center',
                originY: 'center',
                width: opts.width,
                height: opts.height,
                selectable: false,
                hasControls: false,
            };
            const imgElem = new fabric.Image(image, options);
            group.add(imgElem);
            group.addWithUpdate();
            this.render();
        };

        return group;
    }

    calculatePathCoords(from: MapLocation, to: MapLocation): any {
        let x1, x2, y1, y2;
        let result = {};
        if (from) {
            x1 = from.left + from.width / 2;
            y1 = from.top + from.height / 2;
            result = {x1, y1};
        }
        if (to) {
            x2 = to.left + to.width / 2;
            y2 = to.top + to.height / 2;
            result = {...result, ...{x2, y2}};
        }
        return result;
    }

    removeObject(obj: FabricObject) {
        if (obj) {
            // if (obj.type !== 'line') {
            //     obj.data.paths.forEach(pathId => this.removeObject(this.paths[pathId]));
            // }
            this.stage.remove(obj);
            this.render();
        }
    }

    addObject(obj: Object) {
        this.stage.add(obj);
        if (obj.type === 'line') {
            this.stage.moveTo(obj, 0);
        } else {
            this.stage.moveTo(obj, 1);
        }
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
        console.log(this);
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
            stage.setBackgroundImage('', stage.renderAll.bind(stage));
            this.background = stage.setBackgroundImage(image, (img) => {
                this.setDimensions({
                    width: img.width, height: img.height
                });
            }, {
                originX: 'left',
                originY: 'top'
            });
            stage.renderAll();
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
