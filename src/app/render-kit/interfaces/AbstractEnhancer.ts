import { BasicComponent } from "../bases";

export abstract class AbstractEnhancer {
    abstract assignEnhancers(component: BasicComponent): void;
    abstract makeDraggable(component: BasicComponent): void;
    abstract makeScrollable(component: BasicComponent): void;
}