import { Component } from "../models/Component";

export abstract class AbstractEnhancer {
    abstract assignEnhancers(component: Component): void;
    abstract makeDraggable(component: Component): void;
    abstract makeScrollable(component: Component): void;
}