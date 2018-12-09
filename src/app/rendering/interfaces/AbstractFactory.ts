import { AbstractContainer } from './AbstractContainer';
import { RzElement, MetaProps } from "../models";
import {
    PrimitiveContainer, PrimitiveCollection, PrimitiveSprite,
    PrimitiveText, PrimitiveLine, PrimitiveFragment, PrimitivePolygon, PrimitiveRectangle,
    PrimitiveCircle,
} from "../primitives";

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
};

export type Renderer = (element: RzElement, meta: MetaProps, container: AbstractContainer) => void;