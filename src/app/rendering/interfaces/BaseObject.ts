import { DisplayObject, Container, Graphics, Sprite } from 'pixi.js';
import { Subject } from 'rxjs/Subject';

import { BaseProps, BaseObjectChangeEvent } from '../models';

export abstract class BaseObject<T> {
    abstract change?: Subject<BaseObjectChangeEvent>;

    abstract face: DisplayObject & T;
    abstract props: BaseProps;
    abstract parent?: BaseObject<DisplayObject>;
    abstract container: Container;
    abstract template?: string;

    abstract render(container: Container): void;
    abstract remove(): void;
    abstract update(props: BaseProps): void;
}