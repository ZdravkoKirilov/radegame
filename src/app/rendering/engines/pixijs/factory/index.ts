import { Graphics, Container, TextStyle, Text, Sprite } from "pixi.js";

import {
    AbstractFactory, RzElement, MetaProps,
    PrimitiveContainer, PrimitiveCollection,
    PrimitiveText, PrimitiveSprite, PrimitiveLine, PrimitiveFragment, PrimitivePolygon, PrimitiveRectangle,
} from "@app/rendering";

export class PixiFactory implements AbstractFactory {
    createContainer(elem: RzElement, meta: MetaProps): PrimitiveContainer {
        const container = new PrimitiveContainer(elem.props, new Container(), meta);
        return container;
    }
    createCollection(elem: RzElement, meta: MetaProps): PrimitiveCollection {
        const collection = new PrimitiveCollection(elem.props, new Container(), meta);
        return collection;
    }
    createText(elem: RzElement, meta: MetaProps): PrimitiveText {
        const textStyle = new TextStyle({ ...PrimitiveText.defaultTextStyle, ...(elem.props.textStyle || {}) });
        const text = new PrimitiveText(elem.props, new Text(elem.props.value, textStyle), meta);
        text.style = textStyle;
        return text;
    }
    createSprite(elem: RzElement, meta: MetaProps): PrimitiveSprite {
        const image = meta.assets.getTexture(elem.props.image);
        const pixiSprite = image ? new Sprite(image) : null;
        const sprite = new PrimitiveSprite(elem.props, pixiSprite, meta);
        return sprite;
    }
    createLine(elem: RzElement, meta: MetaProps): PrimitiveLine {
        const line = new PrimitiveLine(elem.props, new Graphics(), meta);
        return line;
    }
    createFragment(elem: RzElement, meta: MetaProps): PrimitiveFragment {
        const fragment = new PrimitiveFragment(elem.props, null, meta);
        return fragment;
    }
    createPolygon(elem: RzElement, meta: MetaProps): PrimitivePolygon {
        const polygon = new PrimitivePolygon(elem.props, new Graphics(), meta);
        return polygon;
    }
    createRectangle(elem: RzElement, meta: MetaProps): PrimitiveRectangle {
        const rectangle = new PrimitiveRectangle(elem.props, new Graphics(), meta);
        return rectangle;
    }
}