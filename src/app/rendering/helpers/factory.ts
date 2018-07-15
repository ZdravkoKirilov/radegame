import { TextStyle, Text, Sprite, Container, Graphics } from 'pixi.js-legacy';
import { Component } from '../interfaces';
import { BaseProps, MetaProps, RzElementType, RzElementProps, RzElement } from '../models';
import { PRIMITIVE_TYPES } from '../config';
import { PrimitiveText, PrimitiveSprite, PrimitiveCollection, PrimitiveContainer, PrimitiveLine } from '../primitives';
import { FunctionalComponent, StatefulComponent } from '../mixins';

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
            const pixiSprite = new Sprite(data.image);
            const sprite = new PrimitiveSprite(data, pixiSprite);
            sprite.meta = meta;
            sprite.parent = parent;
            return sprite;
        case PRIMITIVE_TYPES.TEXT:
            const style = new TextStyle({ ...PrimitiveText.defaultTextStyle, ...(data.textStyle || {}) });
            const pixiText = new Text(data.value, style);
            const text = new PrimitiveText(data, pixiText);
            text.meta = meta;
            text.parent = parent;
            text.style = style;
            return text;
        case PRIMITIVE_TYPES.CONTAINER:
            const pixiContainer = new Container();
            const container = new PrimitiveContainer(data, pixiContainer);
            meta.containers[data.name] = container;
            container.meta = meta;
            container.parent = parent;
            return container;
        case PRIMITIVE_TYPES.COLLECTION:
            const pixiCollection = new Container();
            const collection = new PrimitiveCollection(data, pixiCollection);
            meta.containers[data.name] = collection;
            collection.meta = meta;
            collection.parent = parent;
            return collection;
        case PRIMITIVE_TYPES.LINE:
            const pixiLine = new Graphics();
            const line = new PrimitiveLine(data, pixiLine);
            line.meta = meta;
            line.parent = parent;
            return line;
        default:
            return null;
    }
};

export const createCustomFactory = (mapping: { [name: string]: any }): Factory => {

    const factory: Factory = (data?: BaseProps, parent: Component = null, meta?: MetaProps): Component => {
        if (data.type in mapping) {
            const blueprint = mapping[data.type];
            if (!blueprint.composite) {
                const functionalComponent = new FunctionalComponent(data, blueprint);
                functionalComponent.meta = meta;
                return functionalComponent;
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
