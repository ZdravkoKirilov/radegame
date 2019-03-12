import {
    PrimitiveContainer, PrimitiveCollection, PrimitiveSprite,
    PrimitiveText, PrimitiveLine, PrimitiveFragment, PrimitivePolygon,
    PrimitiveRectangle, PrimitiveCircle, PrimitiveEllipse, PrimitiveShadow,
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
    abstract updateCircle?(component: PrimitiveCircle): void;
    abstract updateEllipse?(component: PrimitiveEllipse): void;
    abstract updateShadow?(component: PrimitiveShadow): void;

    abstract removeComponent(component: Component): void;

    abstract getProp: PropGetter;
};

export type PropGetter = (comp: Component, prop: string) => any;