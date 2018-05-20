import { Sprite, DisplayObject, Container } from 'pixi.js';
import { Subject } from 'rxjs/Subject';

import { BaseProps } from '../../models';
import { BaseObject } from '../../interfaces';
import { DisplayComponent } from '../DisplayComponent';

export class PixiSprite extends DisplayComponent<BaseProps, any> {

    public __face__: Sprite;

    constructor(props: BaseProps, face?: Sprite, parent?: BaseObject) {
        super(props, face, parent, );
    }
    render() { 
        return '';
    };
}

