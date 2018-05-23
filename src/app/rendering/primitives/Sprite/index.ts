import { Sprite } from 'pixi.js';

import { BaseProps } from '../../models';
import { BasicComponent } from '../../mixins';
import { Component } from '../../interfaces';

export class PixiSprite extends BasicComponent {

    graphic: Sprite;

    constructor(props: BaseProps, parent: Component) {
        super(props, new Sprite(props.image), parent);
    }
}

