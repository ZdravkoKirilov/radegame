import { Graphics, Container, TextStyle, Text, Sprite } from "pixi.js";

import { AbstractFactory } from "../../../interfaces";
import { RzElement, MetaProps } from "../../../models";
import {
    PrimitiveContainer, PrimitiveCollection,
    PrimitiveText, PrimitiveSprite, PrimitiveLine, PrimitiveFragment
} from "../../../primitives";

export class PixiFactory implements AbstractFactory {
    createContainer(elem: RzElement, meta: MetaProps): PrimitiveContainer {
        const container = new PrimitiveContainer(elem.props, new Container());
        container.meta = meta;
        return container;
    }
    createCollection(elem: RzElement, meta: MetaProps): PrimitiveCollection {
        const collection = new PrimitiveCollection(elem.props, new Container());
        collection.meta = meta;
        return collection;
    }
    createText(elem: RzElement, meta: MetaProps): PrimitiveText {
        const textStyle = new TextStyle(elem.props.textStyle || PrimitiveText.defaultTextStyle);
        const text = new PrimitiveText(elem.props, new Text(elem.props.value, textStyle));
        text.meta = meta;
        return text;
    }
    createSprite(elem: RzElement, meta: MetaProps): PrimitiveSprite {
        const sprite = new PrimitiveSprite(elem.props, new Sprite(meta.textures[elem.props.image].texture));
        sprite.meta = meta;
        return sprite;
    }
    createLine(elem: RzElement, meta: MetaProps): PrimitiveLine {
        const line = new PrimitiveLine(elem.props, new Graphics());
        line.meta = meta;
        return line;
    }
    createFragment(elem: RzElement, meta: MetaProps): PrimitiveFragment {
        const fragment = new PrimitiveFragment(elem.props, null);
        fragment.meta = meta;
        return fragment;
    }
}