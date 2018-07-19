import { RzElement } from "../models";
import {
    PrimitiveContainer, PrimitiveCollection, PrimitiveSprite,
    PrimitiveText, PrimitiveLine
} from "../primitives";

export abstract class AbstractMutator {
    abstract updateContainer(element: RzElement, component: PrimitiveContainer): void;
    abstract updateCollection(element: RzElement, component: PrimitiveCollection): void;

    abstract updateSprite(element: RzElement, component: PrimitiveSprite): void;
    abstract updateText(element: RzElement, component: PrimitiveText): void;
    abstract updateLine(element: RzElement, component: PrimitiveLine): void;
};