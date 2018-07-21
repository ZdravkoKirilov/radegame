import { RzElement } from "../models";
import {
    PrimitiveContainer, PrimitiveCollection, PrimitiveSprite,
    PrimitiveText, PrimitiveLine, PrimitiveFragment
} from "../primitives";
import { Component } from "./Component";

export abstract class AbstractMutator {
    abstract mutateComponent(element: RzElement, component: Component): void;
    abstract updateContainer?(element: RzElement, component: PrimitiveContainer): void;
    abstract updateCollection?(element: RzElement, component: PrimitiveCollection): void;

    abstract updateSprite?(element: RzElement, component: PrimitiveSprite): void;
    abstract updateText?(element: RzElement, component: PrimitiveText): void;
    abstract updateLine?(element: RzElement, component: PrimitiveLine): void;
    abstract updateFragment?(element: RzElement, component: PrimitiveFragment): void;
};