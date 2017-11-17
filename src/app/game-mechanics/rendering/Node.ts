import {Subject} from 'rxjs/Subject';
import {loaders, Sprite} from 'pixi.js';

import {MapLocation} from '../models/Map';
import {ISpriteComponent} from './SpriteComponent';

export class MapNode implements ISpriteComponent {
    loaded: Subject<Sprite> = new Subject();
    loader: loaders.Loader;
    sprite: Sprite;
    image: string;
    _data: MapLocation;

    get data() {
        return this._data;
    }

    set data(data: MapLocation) {
        this._data = data;
        this.update();
    }

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
        this.update();
        this.loaded.next(sprite);
    };

    private update = (): void => {
        if (this.sprite) {
            this.sprite.position.set(this.data.left, this.data.top);
            this.sprite.width = this.data.width;
            this.sprite.height = this.data.height;
        }
    };
}
