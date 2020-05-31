import { Graphics, Container, TextStyle, Text, Sprite } from "pixi.js";

import {
    AbstractFactory, RzElement, MetaProps,
    PrimitiveContainer, PrimitiveCollection,
    PrimitiveText, PrimitiveSprite, PrimitiveLine, PrimitiveFragment, PrimitivePolygon, PrimitiveRectangle, PrimitiveCircle,
    PrimitiveEllipse, PRIMS, RzElementType,
} from "@app/render-kit";

import { Dictionary } from '@app/shared';
import { BasicComponent } from "@app/render-kit";
import { updateText } from "../mutator";

export class PixiFactory implements AbstractFactory {
    createComponent(elem: RzElement, meta: MetaProps): BasicComponent {
        switch (elem.type) {
            case PRIMS.container:
                return this.createContainer(elem, meta);
            case PRIMS.collection:
                return this.createCollection(elem, meta);
            case PRIMS.text:
                return this.createText(elem, meta);
            case PRIMS.sprite:
                return this.createSprite(elem, meta);
            case PRIMS.line:
                return this.createLine(elem, meta);
            case PRIMS.circle:
                return this.createCircle(elem, meta);
            case PRIMS.ellipse:
                return this.createEllipse(elem, meta);
            case PRIMS.polygon:
                return this.createPolygon(elem, meta);
            case PRIMS.rectangle:
                return this.createRectangle(elem, meta);
            case PRIMS.fragment:
                return this.createFragment(elem, meta);
        }
    }
    createContainer(elem: RzElement, meta: MetaProps): PrimitiveContainer {
        const container = new PrimitiveContainer(elem.props, new Container(), meta);
        return container;
    }
    createCollection(elem: RzElement, meta: MetaProps): PrimitiveCollection {
        const collection = new PrimitiveCollection(elem.props, new Container(), meta);
        return collection;
    }
    createText(elem: RzElement<any>, meta: MetaProps): PrimitiveText {
        const textStyle = new TextStyle({ ...PrimitiveText.defaultTextStyle });
        const text = new PrimitiveText(elem.props, new Text(elem.props.value, textStyle), meta);
        text.style = textStyle;
        updateText(text); // Style -> RzTextStyle remapping done there instead of bloating here
        return text;
    }
    createSprite(elem: RzElement<any>, meta: MetaProps): PrimitiveSprite {
        const image = meta.assets.getTexture(elem.props.image);
        const pixiSprite = image ? new Sprite(image) : null;
        const sprite = new PrimitiveSprite(elem.props, pixiSprite, meta);
        return sprite;
    }
    createLine(elem: RzElement<any>, meta: MetaProps): PrimitiveLine {
        const line = new PrimitiveLine(elem.props, new Graphics(), meta);
        return line;
    }
    createFragment(elem: RzElement, meta: MetaProps): PrimitiveFragment {
        const fragment = new PrimitiveFragment(elem.props, null, meta);
        return fragment;
    }
    createPolygon(elem: RzElement<any>, meta: MetaProps): PrimitivePolygon {
        const polygon = new PrimitivePolygon(elem.props, new Graphics(), meta);
        return polygon;
    }
    createRectangle(elem: RzElement<any>, meta: MetaProps): PrimitiveRectangle {
        const rectangle = new PrimitiveRectangle(elem.props, new Graphics(), meta);
        return rectangle;
    }
    createCircle(elem: RzElement<any>, meta: MetaProps): PrimitiveCircle {
        const circle = new PrimitiveCircle(elem.props, new Graphics(), meta);
        return circle;
    }
    createEllipse(elem: RzElement<any>, meta: MetaProps): PrimitiveEllipse {
        const ellipse = new PrimitiveEllipse(elem.props, new Graphics(), meta);
        return ellipse;
    }

    customResolvers = [];

    addCustomResolver(config: Dictionary<RzElementType>) {
        this.customResolvers.push(config);
    }
}