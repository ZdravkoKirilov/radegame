import { Subject } from 'rxjs/Subject';
import { Graphics, Polygon, Point } from 'pixi.js';

import { MapPath } from '../models/index';
import { MapNode } from './Node';

export class Path {
    public select: Subject<MapPath> = new Subject();
    public elem: Graphics;
    private data: MapPath;
    private from: MapNode;
    private to: MapNode;

    constructor(data: MapPath, from: MapNode, to: MapNode) {
        this.data = data;
        this.from = from;
        this.to = to;
        this.elem = new Graphics();
        this.attachListeners();
        this.update();
    }

    private attachListeners() {
        this.from.change.subscribe(() => {
            this.update();
        });
        this.to.change.subscribe(() => {
            this.update();
        });
        this.elem.on('pointerdown', () => {
            this.select.next(this.data);
        });
    }

    private update = (alpha = 1) => {
        const {from, to} = this;
        const x1 = from.left + from.width / 2;
        const y1 = from.top + from.height / 2;
        const x2 = to.left + to.width / 2;
        const y2 = to.top + to.height / 2;
        this.elem.clear();
        this.elem.lineStyle(5, 0xFF0000, alpha);
        this.elem.moveTo(x1, y1);
        this.elem.lineTo(x2, y2);
        this.elem.interactive = true;
        this.elem.buttonMode = true;
        const padding = 30;
        const polygon = [
            new Point(x1 + padding, y1),
            new Point(x2 + padding, y2),
            new Point(x2 - padding, y2),
            new Point(x1 - padding, y1),
            new Point(x1 + padding, y1),
        ];
        this.elem.hitArea = new Polygon(polygon);
        //this.elem.drawPolygon(polygon);
    };
}