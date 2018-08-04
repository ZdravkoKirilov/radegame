import { Component } from "../models/Component";

export abstract class AbstractEvent {
    abstract supported: Set<string>;
    abstract assignEvents(comp: Component): void;
};