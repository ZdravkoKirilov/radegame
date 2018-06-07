import { Text, Sprite, TextStyle, Container } from 'pixi.js';

import { StatelessElement, Component } from '../interfaces';
import { BaseProps, MetaProps } from '../models';
import { PRIMITIVE_TYPES } from '../config';
import { PixiText, PixiSprite, PixiCollection, PixiContainer } from '../primitives';
import { parse } from './parser';
import { StatelessComponent, CompositeComponent } from '../mixins';

export type Factory = (data: BaseProps, parent?: Component, meta?: MetaProps) => Component;

export const createFactory = (factories: Factory[]): Factory => {
    const createComponent: Factory = (data: BaseProps, parent: Component, meta?: MetaProps): Component => {
        let component: Component = null;
        let index = 0;

        while (!component && index < factories.length) {
            let factory = factories[index++];
            component = factory(data, parent, meta);
        }
        return component;
    };
    return createComponent;
};

export const factory: Factory = (data: BaseProps, parent: Component = null, meta?: MetaProps): Component => {
    switch (data.type) {
        case PRIMITIVE_TYPES.SPRITE:
            data.image = meta.textures[data.imageSrc].texture;
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

export const createCustomFactory = (mapping: { [name: string]: any }): Factory => {

    const factory: Factory = (data?: BaseProps, parent: Component = null, meta?: MetaProps): Component => {
        if (data.type in mapping) {
            const blueprint = mapping[data.type];
            if (!blueprint.composite) {
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
