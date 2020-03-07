import { BasicComponent } from "../bases";
import { Component } from "../models";
import { RzEventTypes } from "../helpers";

export abstract class AbstractEventManager {
    abstract assignEvents(comp: BasicComponent): void;
    abstract removeListeners(comp: BasicComponent): void;
};

export interface GenericEvent extends Partial<EventOptionalProps> {
    type: RzEventTypes;

    stopPropagation(): void;
    currentTarget: Component;
    originalTarget: Component;
    propagationStopped: boolean;
};

export type EventOptionalProps = {
    deltaY: number;
    key: string;
    keyCode: number;
    altKey: boolean;
    shiftKey: boolean;
    ctrlKey: boolean;
    x: number;
    y: number;
}

export type GenericEventHandler = (event: GenericEvent) => void;