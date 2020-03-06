import { BasicComponent } from "../bases";
import { Component } from "../models";

export abstract class AbstractEventManager {
    abstract assignEvents(comp: BasicComponent): void;
    abstract removeListeners(comp: BasicComponent): void;
};

export type GenericEventType = string;

export interface GenericEvent {
    type: GenericEventType;

    stopPropagation(): void;
    currentTarget: Component;
    originalTarget: Component;
    propagationStopped: boolean;
};

export type GenericEventHandler = (event: GenericEvent) => void;