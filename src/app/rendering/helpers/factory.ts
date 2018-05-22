import { Text, Sprite, TextStyle, Container } from 'pixi.js';

import { BaseObject, StatelessElement } from '../interfaces';
import { BaseProps } from '../models';
import { PRIMITIVE_TYPES } from '../config';
import { PixiText, PixiSprite, PixiCollection, PixiContainer } from '../primitives';
import { assignEvents } from './events';
import { parse } from './parser';
import { StatelessComponent } from '../primitives/StatelessComponent';

export type Factory = (data: BaseProps, parent?: BaseObject) => BaseObject;

export const factory: Factory = (data: BaseProps, parent: BaseObject = null): BaseObject => {
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
            const collection = new PixiContainer(data, new Container(), parent) as BaseObject;
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

    const factory: Factory = (data?: BaseProps, parent: BaseObject = null): BaseObject => {
        if (data.type in mapping) {
            const blueprint = mapping[data.type];
            if (typeof blueprint === 'function') {
                const result = blueprint(data) as StatelessElement;
                const props = parse({ source: result.template, context: result.context || data, removePrefix: true });
                return new StatelessComponent(props, result.template, null, parent);
            }
            return new blueprint(data, null, parent) as BaseObject;
        } else {
            throw new Error('Unrecognized composite element: ' + data.type);
        }
    };

    return factory;
};
