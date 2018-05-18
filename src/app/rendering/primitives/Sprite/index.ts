import { Sprite, DisplayObject, Container } from 'pixi.js';
import { Subject } from 'rxjs/Subject';

import { BaseElement } from '../../models';
import { BaseObject } from '../../interfaces';
import { DisplayComponent } from '../DisplayComponent';

export class PixiSprite extends DisplayComponent {

    public __face__: Sprite;
    public __props__: BaseElement;

    constructor(props: BaseElement, face?: Sprite, parent?: BaseObject) {
        super(props, face, parent, );
    }
    render() { 
        return '';
    };
}

