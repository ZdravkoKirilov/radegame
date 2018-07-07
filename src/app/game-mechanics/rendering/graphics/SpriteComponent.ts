import { Subject } from 'rxjs';
import * as PIXI from 'pixi.js-legacy';

export class SpriteComponent implements ISpriteComponent {
    loaded: Subject<PIXI.Sprite> = new Subject();
    loader: PIXI.Loader;
    image: string;

    constructor(image: string) {
        this.image = image;
        this.loader = new PIXI.Loader();
        if (this.loader.resources[image]) {
            this.onImageLoaded();
        } else {
            this.loader.add(image).load(this.onImageLoaded);
        }
    }

    onImageLoaded = (): void => {
        const sprite = new PIXI.Sprite(
            this.loader.resources[this.image].texture
        );
        this.loaded.next(sprite);
    };
}

export interface ISpriteComponent {
    loaded: Subject<PIXI.Sprite>;
    image: string;
    onImageLoaded: () => void;
}
