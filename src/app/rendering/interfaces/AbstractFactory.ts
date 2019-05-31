import { AbstractContainer } from './AbstractContainer';
import { RzElement, MetaProps, Component } from "../models";
import {
    PrimitiveContainer, PrimitiveCollection, PrimitiveSprite,
    PrimitiveText, PrimitiveLine, PrimitiveFragment, PrimitivePolygon, PrimitiveRectangle,
    PrimitiveCircle,
    PrimitiveEllipse,
    PrimitiveShadow,
} from "../primitives";

import { Dictionary } from "@app/shared";

export abstract class AbstractFactory {
    abstract createContainer(element: RzElement, meta: MetaProps): PrimitiveContainer;
    abstract createCollection(element: RzElement, meta: MetaProps): PrimitiveCollection;

    abstract createSprite(element: RzElement, meta: MetaProps): PrimitiveSprite;
    abstract createText(element: RzElement, meta: MetaProps): PrimitiveText;
    abstract createLine(element: RzElement, meta: MetaProps): PrimitiveLine;
    abstract createFragment(element: RzElement, meta: MetaProps): PrimitiveFragment;
    abstract createPolygon(element: RzElement, meta: MetaProps): PrimitivePolygon;
    abstract createRectangle(element: RzElement, meta: MetaProps): PrimitiveRectangle;
    abstract createCircle(element: RzElement, meta: MetaProps): PrimitiveCircle;
    abstract createEllipse(element: RzElement, meta: MetaProps): PrimitiveEllipse;

    customResolvers?: Array<Dictionary<Component>>;

    addCustomResolver: (config: Dictionary<Component>) => void;
};

export type Renderer = (element: RzElement, meta: MetaProps, container: AbstractContainer) => void;