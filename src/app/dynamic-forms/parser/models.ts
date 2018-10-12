export type MetaProps = {

};

export type ParseParams = {
    source: string;
    context?: any;
    closure?: { [key: string]: any },
    meta?: MetaProps;
    removePrefix?: boolean;
};

export type BaseProps = {
    type?: string;
    name?: string;
    children?: BaseProps[];
    template?: string;
    body?: string;
    value?: string;
    [key: string]: any;
};

export const PRIMITIVE_TYPES = {
    SPRITE: 'sprite',
    TEXT: 'text',
    CIRCLE: 'circle',
    LINE: 'line',
    RECTANGLE: 'rectangle',
    IMAGE: 'image',
    SOUND: 'sound',
    COLLECTION: 'collection',
    CONTAINER: 'container'
};