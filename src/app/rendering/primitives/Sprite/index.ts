import { Sprite, DisplayObject, Container } from 'pixi.js';
import { Subject } from 'rxjs/Subject';

import { BaseProps } from '../../models';
import { BaseObject } from '../../interfaces';
import { DisplayComponent } from '../DisplayComponent';

export class PixiSprite extends DisplayComponent {

    public face: Sprite;
    public _props: BaseProps;

    constructor(props: BaseProps, parent?: BaseObject) {
        super(props, parent);
        this.face = new Sprite(props.image);
    }
}

