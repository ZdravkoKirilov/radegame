import { Component } from "./Component";

export abstract class AbstractEnhancer {
    abstract makeDraggable(component: Component): void;
}