import { Subject } from 'rxjs/Subject';
import { loaders, Sprite } from 'pixi.js';

export class SpriteComponent implements ISpriteComponent {
    loaded: Subject<Sprite> = new Subject();
    loader: loaders.Loader;
    image: string;

    constructor(image: string) {
        this.image = image;
        this.loader = new loaders.Loader();
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
        this.loaded.next(sprite);
    };
}

export interface ISpriteComponent {
    loaded: Subject<Sprite>;
    image: string;
    onImageLoaded: () => void;
}
