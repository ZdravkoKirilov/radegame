import { DisplayObject, Container, Graphics, Sprite, Application } from 'pixi.js';
import { Subject } from 'rxjs/Subject';

import { BaseProps, BaseObjectChangeEvent } from '../models';

export abstract class BaseObject {

    abstract face: any;
    abstract children: {
        [key: string]: BaseObject;
    }
    abstract props: BaseProps;
    abstract parent?: BaseObject;
    abstract container: Container | Application;
    abstract template?: string;

    abstract render(container: Container | Application): void;
    abstract remove(): void;
    abstract update(props: BaseProps, prevProps?: BaseProps): void;
}