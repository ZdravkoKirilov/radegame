import { Subject } from 'rxjs/Subject';
import { loaders, Sprite } from 'pixi.js';

import { MapLocation } from '../models/Map';
import { ISpriteComponent } from './SpriteComponent';

export class MapNode implements ISpriteComponent {
    private dragging = false;
    private hasMoved = false;

    loaded: Subject<Sprite> = new Subject();
    change: Subject<any> = new Subject();
    moved: Subject<MapLocation> = new Subject();
    select: Subject<MapLocation> = new Subject();

    loader: loaders.Loader;
    sprite: Sprite;
    image: string;
    _data: MapLocation;

    constructor(image: string, data: MapLocation) {
        this.image = image;
        this.loader = new loaders.Loader();
        this.data = data;
        if (this.loader.resources[image]) {
            this.onImageLoaded();
        } else {
            this.loader.add(image).load(this.onImageLoaded);
        }
    }

    onImageLoaded = (): void => {
        const sprite = new Sprite(
            this.loader.resources[this.image].texture
        );
        this.sprite = sprite;
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.sprite.defaultCursor = 'crosshair';
        this.update();
        this.loaded.next(sprite);
        this.attachListeners();
    };

    attachListeners() {
        const {sprite, onDragStart, onDragEnd, onDragMove} = this;
        sprite
            .on('pointerdown', (event) => {
                onDragStart(event);
                this.select.next(this.data);
            })
            .on('pointerup', onDragEnd)
            // .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);
    }

    private onDragStart = (event) => {
        if (!this.dragging) {
            this.sprite.alpha = 0.5;
            this.dragging = true;
        }
    };

    private onDragMove = (event) => {
        if (this.dragging) {
            this.sprite.alpha = 0.5;
            const newPos = event.data.getLocalPosition(this.sprite.parent);
            this.data = {
                ...this.data,
                left: newPos.x - this.sprite.width / 2,
                top: newPos.y - this.sprite.height / 2
            };
            this.hasMoved = true;
        }
    };

    private onDragEnd = (event) => {
        event.stopPropagation();
        this.sprite.alpha = 1;
        if (this.dragging && this.hasMoved) {
            this.moved.next(this.data);
        }
        this.dragging = false;
        this.hasMoved = false;
    };

    get data() {
        return this._data;
    }

    set data(data: MapLocation) {
        this._data = data;
        this.update();
    }

    get left() {
        if (this.sprite) {
            return this.sprite.x;
        }
        return 0;
    }

    get top() {
        if (this.sprite) {
            return this.sprite.y;
        }
        return 0;
    }

    get width() {
        if (this.sprite) {
            return this.sprite.width;
        }
        return 0;
    }

    get height() {
        if (this.sprite) {
            return this.sprite.height;
        }
        return 0;
    }

    private update = (): void => {
        if (this.sprite) {
            this.sprite.position.set(this.data.left, this.data.top);
            this.sprite.width = this.data.width;
            this.sprite.height = this.data.height;
            this.change.next();
        }
    };
}
