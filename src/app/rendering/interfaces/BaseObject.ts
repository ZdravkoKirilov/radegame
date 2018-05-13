import { DisplayObject, Container, Graphics, Sprite } from 'pixi.js';
import { Subject } from 'rxjs/Subject';

import { BaseProps, BaseObjectChangeEvent } from '../models';

export abstract class BaseObject {
    abstract face: DisplayObject | Container | Graphics | Sprite;
    abstract props: BaseProps;
    abstract parent: BaseObject;
    abstract container: Container;

    abstract change: Subject<BaseObjectChangeEvent>;
}