export const PRIMITIVE_TYPES = {
    SPRITE: 'sprite',
    TEXT: 'text',
    CIRCLE: 'circle',
    LINE: 'line',
    RECTANGLE: 'rectangle',
    IMAGE: 'image',
    SOUND: 'sound',
    COLLECTION: 'collection',
    CONTAINER: 'container',
    FRAGMENT: 'fragment'
};

export type PrimitiveType =
    typeof PRIMITIVE_TYPES.SPRITE |
    typeof PRIMITIVE_TYPES.TEXT |
    typeof PRIMITIVE_TYPES.CIRCLE |
    typeof PRIMITIVE_TYPES.LINE |
    typeof PRIMITIVE_TYPES.RECTANGLE |
    typeof PRIMITIVE_TYPES.CONTAINER |
    typeof PRIMITIVE_TYPES.CONTAINER |
    typeof PRIMITIVE_TYPES.FRAGMENT;
