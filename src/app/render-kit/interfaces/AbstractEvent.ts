import { BasicComponent } from "../bases";
import { Component } from "../models";

export abstract class AbstractEventManager {
    abstract assignEvents(comp: BasicComponent): void;
    abstract removeListeners(comp: BasicComponent): void;
};

export interface GenericEvent {
    stopPropagation(): void;
    target: Component;

    propagationStopped: boolean;
};