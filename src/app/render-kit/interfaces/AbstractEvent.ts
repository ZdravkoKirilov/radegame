import { BasicComponent } from "../bases";

export abstract class AbstractEvent {
    abstract supported: Set<string>;
    abstract assignEvents(comp: BasicComponent): void;
    abstract removeListeners(comp: BasicComponent): void;
};