import { Subject } from 'rxjs/Subject';
import { Graphics, Polygon, Point } from 'pixi.js';

import { MapPath } from '../../entities';
import { MapNode } from './Node';

export class Path {
    public select: Subject<MapPath> = new Subject();
    public change: Subject<any> = new Subject();
    public graphics: Graphics;
    private data: MapPath;
    private from: MapNode;
    private to: MapNode;
    private hovered = false;
    private _selected = false;

    constructor(data: MapPath, from: MapNode, to: MapNode) {
        this.data = data;
        this.from = from;
        this.to = to;
        this.graphics = new Graphics();
        this.attachListeners();
        this.update();
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        this._selected = value;
        this.update();
    }

    private attachListeners() {
        this.from.change.subscribe(() => {
            this.update();
        });
        this.to.change.subscribe(() => {
            this.update();
        });
        this.graphics.on('pointerdown', () => {
            this.select.next(this.data);
        });
        this.graphics.on('mouseover', () => {
            this.hovered = true;
            this.update();
        });
        this.graphics.on('mouseout', () => {
            this.hovered = false;
            this.update();
        });
    }

    private update = (alpha = 1) => {
        const {from, to} = this;
        const x1 = from.left + from.width / 2;
        const y1 = from.top + from.height / 2;
        const x2 = to.left + to.width / 2;
        const y2 = to.top + to.height / 2;
        this.graphics.clear();
        this.graphics.lineStyle(5, 0xFF0000, alpha);
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.interactive = true;
        this.graphics.buttonMode = true;
        const padding = 15;
        const polygon = [
            new Point(x1, y1 - padding),
            new Point(x2, y2 - padding),
            new Point(x2, y2 + padding),
            new Point(x1, y1 + padding),
            new Point(x1, y1 - padding),
        ];
        // const polygon = [
        //     new Point(x1 + padding, y1),
        //     new Point(x2 + padding, y2),
        //     new Point(x2 - padding, y2),
        //     new Point(x1 - padding, y1),
        //     new Point(x1 + padding, y1),
        // ];
        this.graphics.hitArea = new Polygon(polygon);
        if (this.hovered || this.selected) {
            this.graphics.lineStyle(1, 0xFF0000, .3);
            this.graphics.drawPolygon(polygon);
        }
        this.change.next();
    };
}