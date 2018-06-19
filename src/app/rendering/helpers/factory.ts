import { Text, Sprite, TextStyle, Container } from 'pixi.js';

import { StatelessElement, Component } from '../interfaces';
import { BaseProps, MetaProps } from '../models';
import { PRIMITIVE_TYPES } from '../config';
import { PixiText, PixiSprite, PixiCollection, PixiContainer } from '../primitives';
import { parse } from './parser';
import { StatelessComponent, StatefulComponent } from '../mixins';

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
            sprite.meta = meta;
            return sprite;
        case PRIMITIVE_TYPES.TEXT:
            const text = new PixiText(data, parent);
            text.meta = meta;
            return text;
        case PRIMITIVE_TYPES.CONTAINER:
            const container = new PixiContainer(data, parent);
            meta.containers[data.name] = container;
            container.meta = meta;
            return container;
        case PRIMITIVE_TYPES.COLLECTION:
            const collection = new PixiContainer(data, parent);
            meta.containers[data.name] = collection;
            collection.meta = meta;
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
                const stateless = new StatelessComponent(data, parent, result.template);
                stateless.meta = meta;
                return stateless;
            }
            const stateful = new blueprint(data, parent) as StatefulComponent<typeof data, any>;
            stateful.meta = meta;
            return stateful;
        } else {
            return null;
        }
    };

    return factory;
};
