import { BasicComponent } from "../bases";
import { AbstractGraphic } from "../models";

export abstract class AbstractEvent {
    abstract supported: Set<string>;
    abstract assignEvents(comp: BasicComponent): void;
    abstract removeListeners(comp: BasicComponent): void;
};

export interface GenericEvent {
    stopPropagation(): void;
    target: AbstractGraphic;
};