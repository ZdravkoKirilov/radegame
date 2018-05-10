import { DisplayObject } from 'pixi.js';

import { BaseProps } from '../models';

export interface Base {
    graphic: DisplayObject;
    props: BaseProps;
}