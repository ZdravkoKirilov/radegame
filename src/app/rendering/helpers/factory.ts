import { Text, Sprite, TextStyle, Container } from 'pixi.js';

import { BaseObject, StatelessObject, StatelessElement } from '../interfaces';
import { BaseElement } from '../models';
import { PRIMITIVE_TYPES } from '../config';
import { PixiText, PixiSprite, PixiCollection, PixiContainer } from '../primitives';
import { assignEvents } from './events';

export type Factory = (data: BaseElement, parent?: BaseObject) => BaseObject | StatelessElement;

export const factory: Factory = (data: BaseElement, parent: BaseObject = null): BaseObject | StatelessElement => {
    switch (data.type) {
        case PRIMITIVE_TYPES.SPRITE:
            const sprite = new PixiSprite(data, new Sprite(data.image), parent);
            assignEvents(data, sprite.__face__);
            return sprite;
        case PRIMITIVE_TYPES.TEXT:
            const textStyle = new TextStyle(data.textStyle || PixiText.defaultTextStyle);
            const text = new PixiText(data, new Text(data.text, textStyle), textStyle, parent);
            assignEvents(data, text.__face__);
            return text;
        case PRIMITIVE_TYPES.CONTAINER:
            const container = new PixiContainer(data, new Container(), parent);
            assignEvents(data, container.__face__);
            return container;
        case PRIMITIVE_TYPES.COLLECTION:
            const collection = new PixiContainer(data, new Container(), parent);
            assignEvents(data, collection.__face__);
            return collection;
        default:
            throw new Error('Unrecognized primitive element: ' + data.type);
    }
};

export const createFactory = (components: { [key: string]: any }): Factory => {
    const mapping = Object.values(components).reduce((total, elem) => {
        total[elem.type] = elem;
        return total;
    }, {});

    const factory: Factory = (data?: BaseElement, parent: BaseObject = null): BaseObject | StatelessElement => {
        if (data.type in mapping) {
            const blueprint = mapping[data.type];
            if (typeof blueprint === 'function') {
                return blueprint(data) as StatelessElement;
            }
            return new blueprint(data, null, parent) as BaseObject;
        } else {
            throw new Error('Unrecognized composite element: ' + data.type);
        }
    };

    return factory;
};
