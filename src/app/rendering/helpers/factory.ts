import * as primitives from '../primitives';
import { BaseObject } from '../interfaces';
import { BaseProps } from '../models';
import { PRIMITIVE_TYPES } from '../config';

export const factory = (props: BaseProps, parent: BaseObject = null): BaseObject => {
    switch (props.type) {
        case PRIMITIVE_TYPES.SPRITE:
            return new primitives.PixiSprite(parent, props);
        default:
            throw new Error('Unrecognized element: ' + props.type);
    }
};
