import {
    PrimitiveContainer, PrimitiveCollection, PrimitiveSprite,
    PrimitiveText, PrimitiveLine, PrimitiveFragment, PrimitivePolygon, PrimitiveRectangle,
} from "../primitives";
import { Component } from "../models";

export abstract class AbstractMutator {
    abstract updateComponent(component: Component): void;
    abstract updateContainer?(component: PrimitiveContainer): void;
    abstract updateCollection?(component: PrimitiveCollection): void;

    abstract updateSprite?(component: PrimitiveSprite): void;
    abstract updateText?(component: PrimitiveText): void;
    abstract updateLine?(component: PrimitiveLine): void;
    abstract updateFragment?(component: PrimitiveFragment): void;
    abstract updatePolygon?(component: PrimitivePolygon): void;
    abstract updateRectangle?(component: PrimitiveRectangle): void;

    abstract removeComponent(component: Component): void;
};