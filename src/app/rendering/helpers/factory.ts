import { Text, Sprite, TextStyle, Container } from 'pixi.js';

import { StatelessElement, Component } from '../interfaces';
import { BaseProps } from '../models';
import { PRIMITIVE_TYPES } from '../config';
import { PixiText, PixiSprite, PixiCollection, PixiContainer } from '../primitives';
import { parse } from './parser';
import { StatelessComponent } from '../mixins';

export type Factory = (data: BaseProps, parent?: Component) => Component;

export const factory: Factory = (data: BaseProps, parent: Component = null): Component => {
    switch (data.type) {
        case PRIMITIVE_TYPES.SPRITE:
            const sprite = new PixiSprite(data, parent);
            return sprite;
        case PRIMITIVE_TYPES.TEXT:
            const text = new PixiText(data, parent);
            return text;
        case PRIMITIVE_TYPES.CONTAINER:
            const container = new PixiContainer(data, parent);
            return container;
        case PRIMITIVE_TYPES.COLLECTION:
            const collection = new PixiContainer(data, parent);
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

    const factory: Factory = (data?: BaseProps, parent: Component = null): Component => {
        if (data.type in mapping) {
            const blueprint = mapping[data.type];
            if (typeof blueprint === 'function') {
                const result = blueprint(data) as StatelessElement;
                const props = parse({ source: result.template, context: result.context || data, removePrefix: true });
                return new StatelessComponent(props, parent, result.template);
            }
            return new blueprint(data, null, parent);
        } else {
            throw new Error('Unrecognized composite element: ' + data.type);
        }
    };

    return factory;
};
