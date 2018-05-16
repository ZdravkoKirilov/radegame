import { DisplayObject } from 'pixi.js';

import * as primitives from '../primitives';
import { BaseObject } from '../interfaces';
import { BaseProps } from '../models';
import { PRIMITIVE_TYPES } from '../config';

export const factory = (props: BaseProps, parent: BaseObject<DisplayObject> = null): BaseObject<DisplayObject> => {
    switch (props.type) {
        case PRIMITIVE_TYPES.SPRITE:
            return new primitives.PixiSprite(parent, props);
        case PRIMITIVE_TYPES.TEXT:
            return new primitives.PixiText(parent, props);
        case PRIMITIVE_TYPES.CONTAINER:
            return new primitives.PixiContainer(parent, props);
        case PRIMITIVE_TYPES.COLLECTION:
            return new primitives.PixiCollection(parent, props);
        default:
            throw new Error('Unrecognized element: ' + props.type);
    }
};
