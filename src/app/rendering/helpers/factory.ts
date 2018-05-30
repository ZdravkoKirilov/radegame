import { Text, Sprite, TextStyle, Container } from 'pixi.js';

import { StatelessElement, Component } from '../interfaces';
import { BaseProps } from '../models';
import { PRIMITIVE_TYPES } from '../config';
import { PixiText, PixiSprite, PixiCollection, PixiContainer } from '../primitives';
import { parse } from './parser';
import { StatelessComponent, CompositeComponent } from '../mixins';

export type Factory = (data: BaseProps, parent?: Component) => Component;

export const createFactory = (factories: Factory[]): Factory => {
    const createComponent: Factory = (data: BaseProps, parent: Component): Component => {
        let component: Component = null;
        let index = 0;

        while (!component && index < factories.length) {
            let factory = factories[index++];
            component = factory(data, parent);
        }

        return component;
    };

    return createComponent;
};

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
            return null;
    }
};

export const createCustomFactory = (components: { [key: string]: any }): Factory => {
    const mapping = Object.values(components).reduce((total, elem) => {
        total[elem.name] = elem;
        return total;
    }, {});

    const factory: Factory = (data?: BaseProps, parent: Component = null): Component => {
        if (data.type in mapping) {
            const blueprint = mapping[data.type];
            if (typeof blueprint === 'function') {
                const result = blueprint(data) as StatelessElement;
                return new StatelessComponent(data, parent, result.template);
            }
            return new blueprint(data, parent) as CompositeComponent<typeof data, any>;
        } else {
            return null;
        }
    };

    return factory;
};
