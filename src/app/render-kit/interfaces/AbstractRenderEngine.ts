import { AbstractFactory } from "./AbstractFactory";
import { AbstractMutator } from "./AbstractMutator";
import { AbstractEventManager } from "./AbstractEvent";
import { AbstractLoader } from "./AbstractLoader";

export interface AbstractRenderEngine {
    factory: AbstractFactory;
    mutator: AbstractMutator;
    event: AbstractEventManager;
    loader: () => AbstractLoader;
    app: any;
    destroy(): void;
};