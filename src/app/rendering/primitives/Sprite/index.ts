import { Sprite, DisplayObject, Container } from 'pixi.js';
import { Subject } from 'rxjs/Subject';

import { BaseProps } from '../../models';
import { BaseObject } from '../../interfaces';
import { DisplayComponent } from '../DisplayComponent';

export class PixiSprite extends DisplayComponent {

    public face: Sprite;
    public _props: BaseProps;

    constructor(parent: BaseObject<DisplayObject>, props: BaseProps) {
        super(parent, props);
        this.face = new Sprite(props.image);
    }
}

