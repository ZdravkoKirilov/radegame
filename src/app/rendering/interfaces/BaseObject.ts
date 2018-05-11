import { DisplayObject, Container, Graphics } from 'pixi.js';

import { BaseProps } from '../models';

export abstract class BaseObject {
    abstract display: DisplayObject | Container | Graphics;
    abstract props: BaseProps;
    abstract parent: BaseObject;
    abstract container: Container;
}