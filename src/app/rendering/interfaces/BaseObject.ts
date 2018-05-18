import { DisplayObject, Container, Graphics, Sprite, Application } from 'pixi.js';
import { Subject } from 'rxjs/Subject';

import { BaseElement, BaseObjectChangeEvent } from '../models';

export abstract class BaseObject {

    abstract __face__: any;
    abstract __children__: {
        [key: string]: BaseObject;
    }
    abstract props: BaseElement;
    abstract parent?: BaseObject;
    abstract template?: string;

    abstract render(): string;
    abstract getContext(): any;
    abstract remove(): void;
    abstract update(props: BaseElement, prevProps?: BaseElement): void;
}

export type StatelessObject = (props: BaseElement) => StatelessElement;

export type StatelessElement = { template: string, context: any };