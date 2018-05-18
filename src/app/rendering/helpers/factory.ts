import { Text, Sprite, TextStyle, Container } from 'pixi.js';

import { BaseObject } from '../interfaces';
import { BaseProps } from '../models';
import { PRIMITIVE_TYPES } from '../config';
import { PixiText, PixiSprite, PixiCollection, PixiContainer } from '../primitives';

export const factory = (props: BaseProps, parent: BaseObject = null): BaseObject => {
    switch (props.type) {
        case PRIMITIVE_TYPES.SPRITE:
            const sprite = new PixiSprite(props, parent);
            sprite.face = new Sprite(props.image);
            assignEvents(props, sprite.face);
            return sprite;
        case PRIMITIVE_TYPES.TEXT:
            const text = new PixiText(props, parent);
            const textStyle = new TextStyle(props.textStyle || PixiText.defaultTextStyle);
            text.face = new Text(props.text, textStyle);
            assignEvents(props, text.face);
            return text;
        case PRIMITIVE_TYPES.CONTAINER:
            const container = new PixiContainer(props, parent);
            container.face = new Container();
            assignEvents(props, container.face);
        case PRIMITIVE_TYPES.COLLECTION:
            const collection = new PixiContainer(props, parent);
            collection.face = new Container();
            assignEvents(props, collection.face);
        default:
            throw new Error('Unrecognized element: ' + props.type);
    }
};

const assignEvents = (props: BaseProps, graphic: any) => {
    const events = Object.keys(props).reduce((total: any, key: string) => {
        if (key.startsWith('on') && typeof props[key] === 'function') {
            const handler = props[key];
            const eventName = key.slice(2).toLowerCase();
            graphic.on(eventName, event => {
                handler(event, props);
            });
        }
        return total;
    }, {});
};

const createChildren = (children: BaseProps[], elem: BaseObject) => {
    return children.reduce((total, child) => {
        total[child.name] = factory(child, elem);
        return total;
    }, {});
};
